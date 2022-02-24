/**
 * Author: SyntaxErrorLineNULL.
 */

import { HelperDeclareSpec } from 'handlebars';
import handlebars from 'handlebars';
import path from 'path';
import { get } from 'lodash';
import glob from 'glob';
import fs from 'fs';
import { MailOptions } from '../mail/interface/mail.options';

export class HandlebarsAdapter {
  private precompiledTemplates: {
    [name: string]: handlebars.TemplateDelegate;
  } = {};

  constructor(option?: HelperDeclareSpec) {
    handlebars.registerHelper('concat', (...args) => {
      args.pop();
      return args.join('');
    });
    handlebars.registerHelper(option || {});
  }

  public compileTemplate(mail: any, callback: any, mailerOptions: MailOptions): void {
    this.precompile(mail.data.template, callback, mailerOptions.template);
    const templateOptions = get(mailerOptions, 'options', { functional: false, data: {} });
    if (templateOptions.functional) {
      this.getFiles(templateOptions);
    }
  }

  private precompile(
    template: any,
    callback: any,
    options: any,
  ): { templateExt: string; templateName: string; templateDir: string; templatePath: string } {
    const templateExt = path.extname(template) || '.hbs';
    const templateName = path.basename(template, path.extname(template));
    const templateDir = path.isAbsolute(template)
      ? path.dirname(template)
      : path.join(get(options, 'dir', ''), path.dirname(template));
    const templatePath = path.join(templateDir, templateName + templateExt);

    if (!this.precompiledTemplates) {
      try {
        const template = fs.readFileSync(templatePath, 'utf-8');

        this.precompiledTemplates[templateName] = handlebars.compile(template, get(options, 'options', {}));
      } catch (error) {
        return callback(error);
      }
    }

    return { templateExt, templateName, templateDir, templatePath };
  }

  private getFiles(options: any) {
    const files = glob.sync(path.join(options.functional.dir, '*.hbs'));
    files.forEach(file => {
      const { templateName, templatePath } = this.precompile(file, () => {}, options.functional);
      handlebars.registerPartial(templateName, fs.readFileSync(templatePath, 'utf-8'));
    });
  }
}
