const arvish = require('arvish');
const encodeurl = require('encodeurl');

const url = `https://vimawesome.com/api/plugins?query=${encodeurl(arvish.input)}`;
arvish.fetch(url).then(data => {
  const items = data.plugins.map(plugin => {
    const author = plugin.github_author || plugin.author;
    let desc = plugin.github_short_desc || plugin.short_desc;
    if (desc.length > 50) desc = `${desc.substring(0, 50).trim()}...`;
    return {
      title: `${plugin.name} 👤 ${author}`,
      subtitle: `${desc} || ${plugin.category} 👥 ${plugin.plugin_manager_users} || ⭐ ${plugin.github_stars}`,
      arg: plugin.github_url,
      mods: {
        ctrl: {
          valid: true,
          arg: `${plugin.github_owner}/${plugin.github_repo_name}`,
          subtitle: `${plugin.github_owner}/${plugin.github_repo_name}`,
        },
      },
    };
  });
  arvish.output(items);
});
