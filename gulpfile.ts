import dotenv from 'dotenv';
dotenv.config();
import gulp from 'gulp';
// @ts-ignore
import minimist from 'minimist';
import fs from 'fs';
// @ts-ignore
import * as _ from 'lodash';
import mongoose, { Document, Schema, model } from 'mongoose';
import glob from 'glob';

import unified from 'unified';
// @ts-ignore
import remark from 'remark';
// @ts-ignore
import parse from 'remark-parse';
// @ts-ignore
import frontmatter from 'remark-frontmatter';
// @ts-ignore
import recommended from 'remark-preset-lint-recommended';
// @ts-ignore
import html from 'remark-html';
import { VFile } from 'vfile';

const stringify = require('remark-stringify');
const vfile = require('to-vfile');
const report = require('vfile-reporter');

const parseFrontmatter = require('remark-parse-yaml');

// TODO: https://github.com/unifiedjs/unified-engine

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
          const node: any = await unified()
            // unified()
            .use(parse)
            // .use(recommended)
            // .use(html)
            .use(frontmatter)
            .use(parseFrontmatter)
            .parse(vfile.readSync(__dirname + '/writs/test.md'));
          // .process(data);
          // .process(data, (error: any, file: any) => {
          //   console.log(file);
          //   console.log(String(file));
          //   console.error(error);
          //   console.error(report(error || file));
          // });

          console.log(`node`);
          console.log(node);
          console.log(node.children[0]);

          const result = await unified().run(node);
          console.log(`result`);
          console.log(result);
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
