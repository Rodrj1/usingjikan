import { writable, type Writable } from "svelte/store";

export 	let previewImage: Writable<string> = writable("")