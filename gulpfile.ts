// Environment Variables
import './env';

import gulp from 'gulp';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import * as _ from 'lodash';
import glob from 'glob';

import unified from 'unified';
// @ts-ignore
// @ts-ignore
import parse from 'remark-parse';
// @ts-ignore
import frontmatter from 'remark-frontmatter';
// @ts-ignore
// @ts-ignore
import html from 'remark-html';
import Git, { Repository } from 'nodegit';

const stringify = require('remark-stringify');
const vfile = require('to-vfile');
const report = require('vfile-reporter');

const parseFrontmatter = require('remark-parse-yaml');
const inserter = require('./src/plugins/inserter');

// var unified = require('unified')
// var parse = require('remark-parse')
var remark2rehype = require('remark-rehype');
// var stringify = require('rehype-stringify')
// var vfile = require('to-vfile')
// var report = require('vfile-reporter')
var getFrontMatter = require('./src/plugins/get-front-matter');

import { config } from './local_modules/ping-updater/src/config';

import { Options, Parser } from './local_modules/ping-updater';

// @ts-ignore
const graphql = require('@octokit/graphql').defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
  }
});

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
// import gql from 'graphql-tag';
//
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
//
import fetch from 'node-fetch';

import {
  CommitCreateManyInput,
  CommitUpsertWithWhereUniqueNestedInput,
  prisma,
  UserUpsertWithWhereUniqueNestedInput
} from './src/prisma/generated/client';

// import { createHttpLink } from 'apollo-link-http';
//
// const link = createHttpLink({ uri: '/graphql', fetch: fetch });
//
// import { HttpLink } from 'apollo-link-http';
// import fetch from 'node-fetch';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: 'https://api.github.com/graphql',
//     fetch: fetch,
//     // headers: {
//     //   authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
//     // }
//   })
// });

const client = new ApolloClient({
  headers: {
    authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
  },
  fetch: fetch as any,
  uri: 'https://api.github.com/graphql'
});

// TODO: https://unified.js.org/create-a-plugin.html
// TODO: https://github.com/unifiedjs/unified-engine

// gulp.task('git/test', async () => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// });

gulp.task('github/test', async () => {
  try {
    const options: Options = Parser.parse(config);

    await prisma.deleteManyCommits({ createdAt_lte: new Date() });
    await prisma.deleteManyOrganizations({ createdAt_lte: new Date() });
    await prisma.deleteManyOwners({ createdAt_lte: new Date() });
    await prisma.deleteManyRepositories({ createdAt_lte: new Date() });
    await prisma.deleteManyUsers({ createdAt_lte: new Date() });

    console.log(options.repositories);
    let repo: Repository;
    for (let repo of options.repositories) {
      const query = gql`
        query repositoryHashes(
          $owner: String!
          $name: String!
          $num: Int = 5
          $refName: String = "master"
        ) {
          repository(name: $name, owner: $owner) {
            ref(qualifiedName: $refName) {
              target {
                ... on Commit {
                  id
                  history(first: $num) {
                    pageInfo {
                      hasNextPage
                    }
                    edges {
                      node {
                        hash: oid
                        messageHeadline
                        message
                        tarballUrl
                        committedDate
                        author {
                          name
                          email
                          date
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const result = await client.query({
        query: query,
        variables: {
          name: repo.name,
          owner: repo.owner,
          refName: repo.refName,
          num: 5
        }
      });

      const hashes = result.data.repository.ref.target.history.edges.map(
        ({ node }: any) => {
          return node.hash;
        }
      );

      const commitsCreate: CommitCreateManyInput = result.data.repository.ref.target.history.edges.map(
        ({ node }: any) => {
          return {
            hash: node.hash,
            committedDate: node.committedDate,
            message: node.message,
            messageHeadline: node.messageHeadline,
            repository: {
              create: {
                email: node.repository.email,
                name: node.author.name,
                // TODO: Fix proper handle
                handle: node.author.name
              }
            }
          };
        }
      );

      const commitsUpsert: CommitUpsertWithWhereUniqueNestedInput = result.data.repository.ref.target.history.edges.map(
        ({ node }: any) => {
          const authorUpsert: UserUpsertWithWhereUniqueNestedInput = {
            where: { email: node.author.email },
            create: {
              email: node.repository.email,
              name: node.repository.name,
              // TODO: Fix proper handle
              handle: node.repository.name
            },
            update: {
              email: node.author.email,
              name: node.repository.name,
              // TODO: Fix proper handle
              handle: node.author.name
            }
          };
          return {
            where: {
              hash: node.hash,
              committedDate: node.committedDate,
              message: node.message,
              messageHeadline: node.messageHeadline,
              repository: {
                userUpsert: authorUpsert
              }
            }
          };
        }
      );

      const output = await prisma.upsertRepository({
        where: { id: '123123' },
        create: {
          name: repo.name,
          owner: { create: { handle: repo.owner } },
          service: 'GitHub',
          commits: commitsCreate
        },
        update: {
          name: repo.name,
          owner: { create: { handle: repo.owner } },
          service: 'GitHub',
          commits: {
            upsert: commitsUpsert
          }
        }
      });

      console.log(output);

      // const { repository } = await graphql(
      //   `
      //     query repositoryHashes(
      //       $owner: String!
      //       $name: String!
      //       $num: Int = 5
      //       $refName: String = "master"
      //     ) {
      //       repository(name: $name, owner: $owner) {
      //         ref(qualifiedName: $refName) {
      //           target {
      //             ... on Commit {
      //               id
      //               history(first: $num) {
      //                 pageInfo {
      //                   hasNextPage
      //                 }
      //                 edges {
      //                   node {
      //                     hash: oid
      //                     messageHeadline
      //                     message
      //                     tarballUrl
      //                     author {
      //                       name
      //                       email
      //                       date
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   `,
      //   {
      //     name: repo.name,
      //     owner: repo.owner,
      //     refName: repo.refName,
      //     num: 5
      //   }
      // );

      console.log(`--- REPOSITORY FROM API ---`);
      console.log(result);
    }

    // // Iterate through repositories
    // if (config.repositories) {
    //   // TODO: Query repos from GraphQL prior to local scans
    //   // See: https://github.com/octokit/graphql.js/tree/master
    //
    //   for (const repoObject of config.repositories) {
    //     let url: string;
    //     let path: string;
    //     switch (repoObject.service) {
    //       case RepositoryServiceTypes.GitHub: {
    //         url = `https://github.com/${repoObject.owner}/${repoObject.name}`;
    //         path = `./.repos/${repoObject.owner}/${repoObject.name}`;
    //         break;
    //       }
    //       default: {
    //         url = `https://github.com/${repoObject.owner}/${repoObject.name}`;
    //         path = `./.repos/${repoObject.owner}/${repoObject.name}`;
    //       }
    //     }
    //
    //     /**
    //      * ??? Start by performing API call with hash of all valid repos?
    //      *
    //      * 1. Check if local repo exists.
    //      * 2. If exists, get hash of most recent commit.
    //      *   - Compare hash
    //      */
    //
    //     let repository: Repository | void = await Git.Repository.open(
    //       path
    //     ).catch(error => {
    //       if (error.errno !== -3) {
    //         throw error;
    //       }
    //     });
    //     // Check if local exists.
    //     if (!repository) {
    //       repository = await Git.Clone.clone(url, path);
    //     } else {
    //       // TODO: Fetch vs pull
    //       // await repository.fetch();
    //     }
    //     const commit: Git.Commit = await repository.getMasterCommit();
    //     console.log(commit.date(), commit.toString(), commit.message());
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
});

gulp.task('md/test', async () => {
  try {
    // unified()
    //   .use(parse)
    //   .use(stringify)
    //   .use(frontmatter, ['yaml', 'toml'])
    //   // .use(logger)
    //   .process(vfile.readSync(__dirname + '/writs/test.md'), function(
    //     err,
    //     file
    //   ) {
    //     console.log(file);
    //     console.log(String(file));
    //     console.error(report(err || file));
    //   });
    //
    // const logger = () => {
    //   return console.dir;
    // };

    glob(__dirname + '/writs/**/test.md', {}, (err, files) => {
      _.forEach(files, (path: string) => {
        console.log(`Path: ${path}`);
        fs.readFile(path, { encoding: 'utf8' }, async (err, data) => {
          const processor: unified.Processor = await unified()
            // unified()
            // .use(parse)
            // // .use(recommended)
            // // .use(html)
            // .use(frontmatter)
            // .use(parseFrontmatter)
            // .use(inserter, { extname: 'html' })
            // .process(vfile.readSync(__dirname + '/writs/test.md'), function(
            //   err,
            //   file
            // ) {
            //   console.error(report(err || file));
            //   // if (file) {
            //   //   vfile.writeSync(file) // Written to `index.html`.
            //   // }
            // });

            .use(parse)
            .use(stringify)
            .use(frontmatter)
            .use(parseFrontmatter)
            // .use(remark2rehype)
            .use(getFrontMatter, { extname: '.html' })
            .use(stringify);
          // .process(vfile.readSync(__dirname + '/writs/test.md'), function(
          //   error,
          //   file
          // ) {
          //   console.log(file);
          //   // console.log(String(file));
          //   // console.error(error);
          //   // console.error(report(error || file));
          // });

          processor
            .process(vfile.readSync(__dirname + '/writs/test.md'))
            .then(file => {
              console.debug('----');
              console.log(file);
              console.debug('----');
            })
            .catch(error => {
              console.error(error);
            });

          // console.log(processor);

          // .process(data);
          // .process(data, (error: any, file: any) => {
          //   console.log(file);
          //   console.log(String(file));
          //   console.error(error);
          //   console.error(report(error || file));
          // });
          //
          // console.log(`node`);
          // console.log(processor);
          // // console.log(node.children[0]);
          //
          // const result = await unified().run(processor);
          // console.log(`result`);
          // console.log(result);
          // console.log(output);
        });
      });
      // console.log(files);
    });

    // glob(__dirname + '/writs/**/test.md', {}, (err, files) => {
    //   _.forEach(files, (path: string) => {
    //     console.log(`Path: ${path}`);
    //     fs.readFile(path, { encoding: 'utf8' }, async (err, data) => {
    //       const blah = await remark()
    //         // unified()
    //         // .use(parse)
    //         .use(recommended)
    //         .use(html)
    //         // .use(frontmatter)
    //         .use(parseFrontmatter)
    //         .parse(data);
    //       // .process(data);
    //       // .process(data, (error: any, file: any) => {
    //       //   console.log(file);
    //       //   console.log(String(file));
    //       //   console.error(error);
    //       //   console.error(report(error || file));
    //       // });
    //       console.log(`blah`);
    //       console.log(blah);
    //       // console.log(output);
    //     });
    //   });
    //   // console.log(files);
    // });
    // fs.readFile('./writs/dgraph-reddit.md');
  } catch (error) {
    throw error;
  }
});

gulp.task('db/create/md/test', () => {
  try {
    require('./src/db');
  } catch (error) {
    throw error;
  }
});

gulp.task('db:schema:alter', () => {
  try {
    return Promise.all([
      // new DgraphAdapter().alterSchema(DgraphSchema.Comment),
      // new DgraphAdapter().alterSchema(DgraphSchema.Post)
    ]);
  } catch (error) {
    throw error;
  }
});

//
// gulp.task('db:generate:data', async () => {
//   try {
//     const query = `{
//       data(func: has(link_id)) {
//         link_id
//       }
//     }`;
//     // Get current comments
//     const comments = _.map(
//       (await new DgraphAdapter().query(query)).data,
//       comment => comment.link_id.substring(3)
//     );
//     const args = minimist(process.argv.slice(3), {
//       default: {
//         batchSize: 250,
//         limit: 1000,
//         offset: 0,
//         path: './src/data/RS_2018-02-01'
//       }
//     });
//     const stream = fs.createReadStream(args.path, {
//       flags: 'r'
//     });
//     // Include optional command line arguments in options.
//     const result = await DgraphAdapter.mutateFromStream(
//       Object.assign(
//         {
//           stream,
//           validator: (data: any) => {
//             if (
//               data.domain &&
//               !data.crosspost_parent &&
//               !data.over_18 &&
//               // If comments exist check that post contains at least 1.
//               data.num_comments > 0 &&
//               (comments && comments.length > 0
//                 ? _.includes(comments, data.id)
//                 : true)
//             ) {
//               // Posts
//               return true;
//             } else if (data.link_id) {
//               // Comments
//               return true;
//             }
//             return false;
//           }
//         },
//         args
//       )
//     );
//     console.log(result);
//   } catch (error) {
//     throw error;
//   }
// });

gulp.task('db:mutate:test', async () => {
  try {
    const request = {
      createdAt: new Date(),
      description: 'Hello, this is Alice!',
      email: 'alice@example.com',
      name: 'Alice Jones'
    };
    const result = '';
    // const result = await new DgraphAdapter().mutate({
    //   request
    // });
    console.log(result);
  } catch (error) {
    throw error;
  }
});

// gulp.task('db:regenerate', gulp.series('db:drop', 'db:generate:data'));
