# STYLING WAS EXTRACTED FROM /dist/styles/styles.css USING Muse Spark 1.2 Free

# sudoloser design language v1.0

Familiar soft pastel system for all of my software.

## Use

### CSS
```html
<link rel="stylesheet" href="/design-language/tokens.css">
<a class="sl-button">Click</a>
<span class="sl-tag">Rust</span>
<hr class="sl-divider">
```

### Rust
```toml
[dependencies]
sudoloser-design = { path = "../design-language/rust" }
```
```rust
use sudoloser_design::palette;
println!("{}", palette::BG.hex_string()); // #FFF5F5
```

Optional features: `iced`, `egui`
```toml
sudoloser-design = { path = "../design-language/rust", features = ["iced"] }
```

### Tokens
See `tokens.css` (:root vars) and `tokens.json`.
Colors: bg #FFF5F5, soft #ffddf8, text #4A4A4A, accent #c098c3
Font: Varela Round, Radius: 5px / 10px
