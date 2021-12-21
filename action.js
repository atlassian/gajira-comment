const Jira = require('./common/net/Jira');

module.exports = class {
  constructor({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    });

    this.config = config;
    this.argv = argv;
    this.githubEvent = githubEvent;
  }

  async execute() {
    const issues = this.argv.issue || this.config.issue || null;
    const { comment, allowRepeats } = this.argv;

    const issueIds = typeof issues === 'string' ? issues.split(',') : [];
    for (const issueId of issueIds) {
      try {
        if (allowRepeats === 'false') {
          const resp = await this.Jira.getIssue(issueId);

          if (resp.fields.comment.comments.find((commentObj) => commentObj.body === comment) !== undefined) {
            console.log(`Comment already exists on issue: ${issueId}`);
            continue;
          }
        }

        console.log(`Adding comment to ${issueId}: \n${comment}`);
        await this.Jira.addComment(issueId, { body: comment });
      } catch (err) {
        console.log(`Failed to add comment on ${issueId}:`, err);
      }
    }

    return {};
  }
};
