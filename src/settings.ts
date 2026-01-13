import {App, PluginSettingTab, Setting} from 'obsidian'

import type TodoPlugin from './main'
import type {GroupByType, LookAndFeel, SortDirection} from './_types'

export interface TodoSettings {
  todoPageName: string
  showChecked: boolean  // Deprecated: use showDone instead
  showAllTodos: boolean
  showOnlyActiveFile: boolean
  autoRefresh: boolean
  groupBy: GroupByType
  subGroups: boolean
  sortDirectionItems: SortDirection
  sortDirectionGroups: SortDirection
  sortDirectionSubGroups: SortDirection
  includeFiles: string
  lookAndFeel: LookAndFeel
  _collapsedSections: string[]
  _hiddenTags: string[]
  // Marker visibility settings
  showTodo: boolean
  showIncomplete: boolean
  showDone: boolean
  showCanceled: boolean
  showForwarded: boolean
  showScheduling: boolean
  showQuestion: boolean
  showImportant: boolean
  showStar: boolean
  showQuote: boolean
  showLocation: boolean
  showBookmark: boolean
  showInformation: boolean
  showSavings: boolean
  showIdea: boolean
  showPros: boolean
  showCons: boolean
  showFire: boolean
  showKey: boolean
  showWin: boolean
  showUp: boolean
  showDown: boolean
}

export const DEFAULT_SETTINGS: TodoSettings = {
  todoPageName: 'todo',
  showChecked: false,  // Deprecated
  showAllTodos: false,
  showOnlyActiveFile: false,
  autoRefresh: true,
  subGroups: false,
  groupBy: 'page',
  sortDirectionItems: 'new->old',
  sortDirectionGroups: 'new->old',
  sortDirectionSubGroups: 'new->old',
  includeFiles: '',
  lookAndFeel: 'classic',
  _collapsedSections: [],
  _hiddenTags: [],
  // Marker visibility defaults - show most common types by default
  showTodo: true,
  showIncomplete: true,
  showDone: false,  // Hide completed by default (matches old behavior)
  showCanceled: false,
  showForwarded: true,
  showScheduling: true,
  showQuestion: true,
  showImportant: true,
  showStar: true,
  showQuote: true,
  showLocation: true,
  showBookmark: true,
  showInformation: true,
  showSavings: true,
  showIdea: true,
  showPros: true,
  showCons: true,
  showFire: true,
  showKey: true,
  showWin: true,
  showUp: true,
  showDown: true,
}

export class TodoSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: TodoPlugin,
  ) {
    super(app, plugin)
  }

  display(): void {
    this.containerEl.empty()

    this.containerEl.createEl('h3', {
      text: 'General Settings',
    })

    this.buildSettings()
  }

  private buildSettings() {
    /** GENERAL */

    new Setting(this.containerEl).setName('General')

    new Setting(this.containerEl)
      .setName('Tag name')
      .setDesc(
        'e.g. "todo" will match #todo. You may add mutliple tags separated by a newline. Leave empty to capture all',
      )
      .addTextArea(text =>
        text
          .setPlaceholder('todo')
          .setValue(this.plugin.getSettingValue('todoPageName'))
          .onChange(async value => {
            await this.plugin.updateSettings({
              todoPageName: value,
            })
          }),
      )

    new Setting(this.containerEl)
      .setName('Show Completed?')
      .setDesc('Deprecated: Use "Show Done" in Marker Visibility section below')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showChecked'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showChecked: value, showDone: value})
        })
      })

    /** MARKER VISIBILITY */

    new Setting(this.containerEl).setName('Marker Visibility').setHeading()

    new Setting(this.containerEl)
      .setName('Show To-Do [ ]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showTodo'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showTodo: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Incomplete [/]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showIncomplete'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showIncomplete: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Done [x]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showDone'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showDone: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Canceled [-]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showCanceled'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showCanceled: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Forwarded [>]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showForwarded'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showForwarded: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Scheduling [<]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showScheduling'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showScheduling: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Question [?]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showQuestion'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showQuestion: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Important [!]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showImportant'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showImportant: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Star [*]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showStar'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showStar: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Quote ["]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showQuote'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showQuote: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Location [l]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showLocation'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showLocation: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Bookmark [b]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showBookmark'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showBookmark: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Information [i]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showInformation'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showInformation: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Savings [S]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showSavings'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showSavings: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Idea [I]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showIdea'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showIdea: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Pros [p]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showPros'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showPros: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Cons [c]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showCons'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showCons: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Fire [f]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showFire'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showFire: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Key [k]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showKey'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showKey: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Win [w]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showWin'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showWin: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Up [u]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showUp'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showUp: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show Down [d]')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showDown'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showDown: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show All Todos In File?')
      .setDesc(
        'Show all items in file if tag is present, or only items attached to the block where the tag is located. Only has an effect if Tag Name is not empty',
      )
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showAllTodos'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showAllTodos: value})
        })
      })

    new Setting(this.containerEl)
      .setName('Show only in currently active file?')
      .setDesc(
        'Show only todos present in currently active file?'
      )
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('showOnlyActiveFile'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({showOnlyActiveFile: value})
        })
      })

    /** GORUPING & SORTING */

    new Setting(this.containerEl).setName('Grouping & Sorting')

    new Setting(this.containerEl).setName('Group By').addDropdown(dropdown => {
      dropdown.addOption('page', 'Page')
      dropdown.addOption('tag', 'Tag')
      dropdown.addOption('marker', 'Marker')
      dropdown.setValue(this.plugin.getSettingValue('groupBy'))
      dropdown.onChange(async (value: GroupByType) => {
        await this.plugin.updateSettings({groupBy: value})
      })
    })

    // new Setting(this.containerEl)
    //   .setName("Enable Sub-Groups?")
    //   .addToggle((toggle) => {
    //     toggle.setValue(this.plugin.getSettingValue("subGroups"))
    //     toggle.onChange(async (value) => {
    //       await this.plugin.updateSettings({ subGroups: value })
    //     })
    //   })
    //   .setDesc("When grouped by page you will see sub-groups by tag, and vice versa.")

    new Setting(this.containerEl)
      .setName('Item Sort')
      .addDropdown(dropdown => {
        dropdown.addOption('a->z', 'A -> Z')
        dropdown.addOption('z->a', 'Z -> A')
        dropdown.addOption('new->old', 'New -> Old')
        dropdown.addOption('old->new', 'Old -> New')
        dropdown.setValue(this.plugin.getSettingValue('sortDirectionItems'))
        dropdown.onChange(async (value: SortDirection) => {
          await this.plugin.updateSettings({
            sortDirectionItems: value,
          })
        })
      })
      .setDesc(
        'Time sorts are based on last time the file for a particular item was edited',
      )

    new Setting(this.containerEl)
      .setName('Group Sort')
      .addDropdown(dropdown => {
        dropdown.addOption('a->z', 'A -> Z')
        dropdown.addOption('z->a', 'Z -> A')
        dropdown.addOption('new->old', 'New -> Old')
        dropdown.addOption('old->new', 'Old -> New')
        dropdown.setValue(this.plugin.getSettingValue('sortDirectionGroups'))
        dropdown.onChange(async (value: SortDirection) => {
          await this.plugin.updateSettings({
            sortDirectionGroups: value,
          })
        })
      })
      .setDesc(
        'Time sorts are based on last time the file for the newest or oldest item in a group was edited',
      )

    // new Setting(this.containerEl)
    //   .setName("Sub-Group Sort")
    //   .addDropdown((dropdown) => {
    //     dropdown.addOption("a->z", "A -> Z")
    //     dropdown.addOption("z->a", "Z -> A")
    //     dropdown.addOption("new->old", "New -> Old")
    //     dropdown.addOption("old->new", "Old -> New")
    //     dropdown.setValue(this.plugin.getSettingValue("sortDirectionSubGroups"))
    //     dropdown.onChange(async (value: SortDirection) => {
    //       await this.plugin.updateSettings({ sortDirectionSubGroups: value })
    //     })
    //   })
    //   .setDesc("Time sorts are based on last time the file for the newest or oldest item in a group was edited")

    /** STYLING */

    new Setting(this.containerEl).setName('Styling')

    new Setting(this.containerEl)
      .setName('Look and Feel')
      .addDropdown(dropdown => {
        dropdown.addOption('classic', 'Classic')
        dropdown.addOption('compact', 'Compact')
        dropdown.setValue(this.plugin.getSettingValue('lookAndFeel'))
        dropdown.onChange(async (value: LookAndFeel) => {
          await this.plugin.updateSettings({lookAndFeel: value})
        })
      })

    /** ADVANCED */

    new Setting(this.containerEl).setName('Advanced')

    new Setting(this.containerEl)
      .setName('Include Files')
      .setDesc(
        'Include all files that match this glob pattern. Examples on plugin page/github readme. Leave empty to check all files.',
      )
      .setTooltip('**/*')
      .addText(text =>
        text
          .setValue(this.plugin.getSettingValue('includeFiles'))
          .onChange(async value => {
            await this.plugin.updateSettings({
              includeFiles: value,
            })
          }),
      )

    new Setting(this.containerEl)
      .setName('Auto Refresh List?')
      .addToggle(toggle => {
        toggle.setValue(this.plugin.getSettingValue('autoRefresh'))
        toggle.onChange(async value => {
          await this.plugin.updateSettings({autoRefresh: value})
        })
      })
      .setDesc(
        'It\'s recommended to leave this on unless you are expereince performance issues due to a large vault. You can then reload manually using the "Checklist: refresh" command',
      )
  }
}
