<script lang="ts">
  import type { App } from "obsidian"
  import { setIcon } from "obsidian"
  import { onMount } from "svelte"

  import type { LookAndFeel, TodoItem, TodoMarker } from "src/_types"
  import { navToFile, toggleTodoItem } from "src/utils"
  import CheckCircle from "./CheckCircle.svelte"

  export let item: TodoItem
  export let lookAndFeel: LookAndFeel
  export let app: App

  let contentDiv: HTMLDivElement
  let markerIconDiv: HTMLDivElement

  const markerIcons: Record<TodoMarker, string> = {
    'todo': 'circle',
    'incomplete': 'circle-dot-dashed',
    'done': 'check-circle',
    'canceled': 'x-circle',
    'forwarded': 'arrow-right-circle',
    'scheduling': 'calendar-clock',
    'question': 'help-circle',
    'important': 'triangle-alert',
    'star': 'star',
    'quote': 'quote',
    'location': 'map-pin',
    'bookmark': 'bookmark',
    'information': 'info',
    'savings': 'piggy-bank',
    'idea': 'lightbulb',
    'pros': 'thumbs-up',
    'cons': 'thumbs-down',
    'fire': 'flame',
    'key': 'key',
    'win': 'trophy',
    'up': 'arrow-up',
    'down': 'arrow-down',
  }

  // Don't show icons for basic todo and done states
  const shouldShowIcon = (marker: TodoMarker): boolean => {
    return marker !== 'todo' && marker !== 'done'
  }

  const markerColors: Record<TodoMarker, string> = {
    'todo': '',
    'done': '',
    'incomplete': 'var(--text-accent)',
    'canceled': 'var(--text-muted)',
    'forwarded': 'var(--text-accent)',
    'scheduling': 'var(--text-accent)',
    'question': 'var(--text-warning)',
    'important': 'var(--text-error)',
    'star': 'var(--text-warning)',
    'quote': 'var(--text-muted)',
    'location': 'var(--text-accent)',
    'bookmark': 'var(--text-accent)',
    'information': 'var(--text-accent)',
    'savings': 'var(--text-success)',
    'idea': 'var(--text-warning)',
    'pros': 'var(--text-success)',
    'cons': 'var(--text-error)',
    'fire': 'var(--text-error)',
    'key': 'var(--text-warning)',
    'win': 'var(--text-success)',
    'up': 'var(--text-success)',
    'down': 'var(--text-error)',
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

  onMount(() => {
    if (markerIconDiv && shouldShowIcon(item.marker)) {
      setIcon(markerIconDiv, markerIcons[item.marker])
    }
  })

  $: {
    if (contentDiv) contentDiv.innerHTML = item.rawHTML
  }

  $: {
    if (markerIconDiv && item.marker && shouldShowIcon(item.marker)) {
      markerIconDiv.innerHTML = ''
      setIcon(markerIconDiv, markerIcons[item.marker])
    }
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
    {#if shouldShowIcon(item.marker)}
      <div bind:this={markerIconDiv} class="marker-icon" style="color: {markerColors[item.marker]}" />
    {/if}
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
  .marker-icon {
    flex-shrink: 0;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
  .marker-icon :global(svg) {
    width: 20px;
    height: 20px;
    color: inherit;
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
