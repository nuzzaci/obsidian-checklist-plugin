<script lang="ts">
  import type { App } from "obsidian"

  import type { LookAndFeel, TodoItem, TodoMarker } from "src/_types"
  import { navToFile, toggleTodoItem } from "src/utils"
  import CheckCircle from "./CheckCircle.svelte"

  export let item: TodoItem
  export let lookAndFeel: LookAndFeel
  export let app: App

  let contentDiv: HTMLDivElement

  const markerLabels: Record<TodoMarker, string> = {
    'todo': 'To-Do',
    'incomplete': 'Incomplete',
    'done': 'Done',
    'canceled': 'Canceled',
    'forwarded': 'Forwarded',
    'scheduling': 'Scheduling',
    'question': 'Question',
    'important': 'Important',
    'star': 'Star',
    'quote': 'Quote',
    'location': 'Location',
    'bookmark': 'Bookmark',
    'information': 'Info',
    'savings': 'Savings',
    'idea': 'Idea',
    'pros': 'Pros',
    'cons': 'Cons',
    'fire': 'Fire',
    'key': 'Key',
    'win': 'Win',
    'up': 'Up',
    'down': 'Down',
  }

  const toggleItem = async (item: TodoItem) => {
    toggleTodoItem(item, app)
  }

  const handleClick = (ev: MouseEvent, item?: TodoItem) => {
    const target: HTMLElement = ev.target as any
    if (target.tagName === "A") {
      ev.stopPropagation()
      if (target.dataset.type === "link") {
        navToFile(app, target.dataset.filepath, ev, item?.line)
      } else if (target.dataset.type === "tag") {
        // goto tag
      }
    }
    else {
      navToFile(app, item.filePath, ev, item?.line)
    }
  }
  $: {
    if (contentDiv) contentDiv.innerHTML = item.rawHTML
  }
</script>

<li class={`${lookAndFeel}`}>
  <button
    class="toggle"
    on:click={(ev) => {
      toggleItem(item)
      ev.stopPropagation()
    }}
  >
    <CheckCircle checked={item.checked} />
  </button>
  <div class="content" on:click={(ev) => handleClick(ev, item)}>
    <span bind:this={contentDiv} class="content-text" />
    <span class="marker-label">{markerLabels[item.marker]}</span>
  </div>
</li>

<style>
  li {
    display: flex;
    align-items: center;
    background-color: var(--checklist-listItemBackground);
    border-radius: var(--checklist-listItemBorderRadius);
    margin: var(--checklist-listItemMargin);
    cursor: pointer;
    transition: background-color 100ms ease-in-out;
  }
  li:hover {
    background-color: var(--checklist-listItemBackground--hover);
  }
  .toggle {
    padding: var(--checklist-togglePadding);
    background: transparent;
    box-shadow: var(--checklist-listItemBoxShadow);
    flex-shrink: 1;
    width: initial;
  }
  .content {
    padding: var(--checklist-contentPadding);
    flex: 1;
    font-size: var(--checklist-contentFontSize);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .content-text {
    flex: 1;
    min-width: 0;
  }
  .marker-label {
    flex-shrink: 0;
    font-size: 0.75em;
    opacity: 0.6;
    padding: 2px 6px;
    border-radius: 3px;
    background-color: var(--background-modifier-border);
    white-space: nowrap;
  }
  .compact {
    bottom: var(--checklist-listItemMargin--compact);
  }
  .compact > .content {
    padding: var(--checklist-contentPadding--compact);
  }
  .compact > .toggle {
    padding: var(--checklist-togglePadding--compact);
  }
  .toggle:hover {
    opacity: 0.8;
  }
</style>
