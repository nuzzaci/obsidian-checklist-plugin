# Checklist with Markers for Obsidian

This plugin consolidates checklists from across files into a single sidebar view.

**This is a fork** of [delashum's Checklist plugin](https://github.com/delashum/obsidian-checklist-plugin) (v2.2.14) with extended marker support.

## New in this Fork: Extended Marker Support

This fork adds support for all 24 checkbox markers, giving you fine-grained control over which types of items appear in your checklist view. Learn more about extended checkbox syntax at [minimal.guide/checklists](https://minimal.guide/checklists).

### Supported Markers

- `[ ]` to-do
- `[/]` incomplete
- `[x]` done
- `[-]` canceled
- `[>]` forwarded
- `[<]` scheduling
- `[?]` question
- `[!]` important
- `[*]` star
- `["]` quote
- `[l]` location
- `[b]` bookmark
- `[i]` information
- `[S]` savings
- `[I]` idea
- `[p]` pros
- `[c]` cons
- `[f]` fire
- `[k]` key
- `[w]` win
- `[u]` up
- `[d]` down

Each marker type has its own visibility toggle in the settings, allowing you to customize which items appear in your checklist view.

![screenshot-main](https://raw.githubusercontent.com/delashum/obsidian-checklist-plugin/master/images/screenshot-two-files.png)

## Usage

After enabling this plugin, you will see the checklist appear in the right sidebar. If you do not you can run the `Checklist: Open View` command from the command palette to get it to appear.

By default block of checklist items you tag with `#todo` will appear in this sidebar.

You can complete checklist items by checking them off in your editor (e.g. `- [ ]` -> `- [x]`) or by clicking a checklist item in the sidebar which will update your `.md` file for you

## Configuration

![screenshot-settings](https://raw.githubusercontent.com/delashum/obsidian-checklist-plugin/master/images/screenshot-settings.png)

**Tag name:** The default tag to lookup checklist items by is `#todo`, but may be changed to whatever you like

**Show completed?:** By default the plugin will only show uncompleted tasks, and as tasks are completed they will filter out of the sidebar. You may choose to show all tasks (Deprecated: use "Marker Visibility" settings below for fine-grained control)

![screenshot-completed](https://raw.githubusercontent.com/delashum/obsidian-checklist-plugin/master/images/screenshot-show-completed.png)

**Marker Visibility:** Control which marker types appear in your checklist view. Each of the 24 marker types has its own toggle. By default, most markers are shown except "done" and "canceled" items.

**Show All Todos In File?:** By default the plugin will only show tasks in the block that is tagged - changing this will show all tasks present in a file if the tag is present anywhere on the page.

**Group by:** You can group by either file or tagname. If you choose to group by tag name they will appear in the order that they first appear in your files (or last depending on sort order)

![screenshot-tags](https://raw.githubusercontent.com/delashum/obsidian-checklist-plugin/master/images/screenshot-sub-tag.png)

**Sort order:** By default checklist items will appear in the order they appear in the file, with files ordered with the oldest at the top. This can be changed to show the newest files at the top.

## Glob File Matching

The "Include Files" setting uses Glob file matching. Specifically the plugin uses [minimatch](https://github.com/isaacs/minimatch) to match the file pattern - so any specific oddities will come from that plugin.

Couple of common examples to help structure your glob:

- `!{_templates/**,_archive/**}` will include everything except for the two directories `_templates` and `_archive`.
- `{Daily/**,Weekly/**}` will only include files in the `Daily` & `Weekly` directories

I recommend the [Digital Ocean Glob Tool](https://www.digitalocean.com/community/tools/glob) for figuring out how globs work - although the implementation is not identical to minimatch so there might be slight differences.
