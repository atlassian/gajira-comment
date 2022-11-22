# Jira Comment

Add a comment to an issue

> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To add comment to an issue you need to specify an issue key and a comment as action inputs, like:

```yaml
- name: Comment on issue
  uses: atlassian/gajira-comment@v3
  with:
  issue: INC-2
  comment: ${{ github.event.pusher.name }} pushed to repository: ${{ github.event.repository.full_name }}
```

You can interpolate fields from [GitHub event which triggered the workflow](https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions#github-context) into a comment body. For example, if you set your workflow to be triggered on the `push` event, you can specify the pusher name in comment body by including `${{ github.event.pusher }}` field from the [push](https://developer.github.com/v3/activity/events/types/#pushevent) event:

    "${{ github.event.pusher.name }} pushed to repository: ${{ github.event.repository.full_name }}"

Which will result in comment:

    Codertocat pushed to repository: Codertocat/Hello-World

----
## Action Spec

### Environment variables
- None

### Inputs
- `issue` - An issue key to add a comment for
- `comment` - Comment

### Outputs
- None

### Reads fields from config file at $HOME/jira/config.yml
- `issue`

### Writes fields to config file at $HOME/jira/config.yml
- None