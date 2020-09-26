const phin = require('phin');
const cheerio = require('cheerio');
const chalk = require('chalk');
const boxen = require('boxen');

class GetWOD {
  /**
   * @param {string} gym - The gym url
   */
  constructor(gym) {
    this.url = `https://beyondthewhiteboard.com/gyms/${gym}`;
  }

  /**
   * @param   {string}  arg  --no-format removes formatting from the outputed
   *  text;
   */
  async execute(arg) {
    try {
      const { body } = await phin(this.url);
      const $ = cheerio.load(body.toString());
      const date = `WODs for ${$('#wods-date').val()}`;
      const workout = $('.event-workout')
        .text()
        .split('\n')
        .map((str) => str.trim())
        // .filter((str) => str.length !== 0)
        .join('\n');
      const text = `${date}\n${workout}`;
      console.log(arg === '--no-format' ? text : GetWOD.format(text));
    } catch (error) {
      console.error(error);
    }
  }

  static format(str) {
    const greeting = chalk.white.bold(str);
    const boxenOptions = {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green',
      backgroundColor: '#555555',
    };
    const msgBox = boxen(greeting, boxenOptions);

    return msgBox;
  }
}

module.exports = GetWOD;
