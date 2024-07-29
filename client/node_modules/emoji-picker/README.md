# Emoji Picker
Add more emoji to your life.

## Example

```Javascript
import {EmojiPicker} from 'emoji-picker';

console.log(`Emojis are so fun! ${EmojiPicker('happy')}`);
```

## Usage

### Methods

* `EmojiPicker(emotion: EmojiOption | string, unicode: boolean = false): string`
    * `emotion: EmojiOption | string`: The emotion you want emojied
    * `unicode: boolean`: Whether you want unicode emojis or Slack-style ascii
    * Returns an emoji to represent the specified emotion.
    If it can't find an emoji to represent the specified emotion, then it will return an empty string

### Properties

* `EmojiOption: enum`
    * Emotions that are available to emojify
