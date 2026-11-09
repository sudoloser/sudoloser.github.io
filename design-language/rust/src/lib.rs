pub mod palette {
    #[derive(Debug, Clone, Copy)]
    pub struct Rgb { pub r: u8, pub g: u8, pub b: u8 }

    impl Rgb {
        pub const fn new(r: u8, g: u8, b: u8) -> Self { Self { r, g, b } }
        pub const fn hex(&self) -> u32 { (self.r as u32) << 16 | (self.g as u32) << 8 | self.b as u32 }
        pub fn hex_string(&self) -> String { format!("#{:02X}{:02X}{:02X}", self.r, self.g, self.b) }
        pub fn normalized(&self) -> [f32; 3] { [self.r as f32 / 255.0, self.g as f32 / 255.0, self.b as f32 / 255.0] }
    }

    pub const BG: Rgb = Rgb::new(0xFF, 0xF5, 0xF5);
    pub const BG_SOFT: Rgb = Rgb::new(0xFF, 0xDD, 0xF8);
    pub const TEXT: Rgb = Rgb::new(0x4A, 0x4A, 0x4A);
    pub const TEXT_INVERSE: Rgb = Rgb::new(0xFF, 0xFF, 0xFF);
    pub const ACCENT: Rgb = Rgb::new(0xC0, 0x98, 0xC3);
    pub const ACCENT_HOVER: Rgb = Rgb::new(0x55, 0x55, 0x55);
    pub const ACCENT_PRESSED: Rgb = Rgb::new(0x3A, 0x3A, 0x3A);
    pub const SURFACE: Rgb = Rgb::new(0x4A, 0x4A, 0x4A);

    pub mod hex {
        pub const BG: &str = "#FFF5F5";
        pub const BG_SOFT: &str = "#ffddf8";
        pub const TEXT: &str = "#4A4A4A";
        pub const TEXT_INVERSE: &str = "#ffffff";
        pub const ACCENT: &str = "#c098c3";
        pub const ACCENT_HOVER: &str = "#555555";
        pub const SURFACE: &str = "#4A4A4A";
    }

    pub mod radius {
        pub const SM: f32 = 5.0;
        pub const MD: f32 = 10.0;
        pub const PILL: f32 = 999.0;
    }

    pub mod font {
        pub const FAMILY: &str = "Varela Round";
        pub const FALLBACK: &str = "sans-serif";
    }
}

#[cfg(feature = "iced")]
pub mod iced {
    use crate::palette::*;
    use iced::Color;
    pub fn from_rgb(c: Rgb) -> Color { Color::from_rgb8(c.r, c.g, c.b) }
    pub const BG: Color = Color::from_rgb(1.0, 0.9607843, 0.9607843);
    pub const TEXT: Color = Color::from_rgb(0.2901961, 0.2901961, 0.2901961);
    pub const ACCENT: Color = Color::from_rgb(0.7529412, 0.59607846, 0.7647059);
}

#[cfg(feature = "egui")]
pub mod egui {
    use crate::palette::*;
    use egui::Color32;
    pub fn from_rgb(c: Rgb) -> Color32 { Color32::from_rgb(c.r, c.g, c.b) }
}

pub use palette::*;
