import mage_sprite from "../assets/sprites/main-character/wizard-idle.png";
import mage_projectile_sprite from "../assets/sprites/projectile/mage_projectile.png";

import elf_sprite from "../assets/sprites/main-character/elf-idle.png";
import elf_projectile_sprite from "../assets/sprites/projectile/elf_projectile.png";

import goblin from "../assets/sprites/enemies/goblin.png";
import swampy from "../assets/sprites/enemies/swampy.png";
import muddy from "../assets/sprites/enemies/muddy.png";

const SPRITES = {
    mage: {
        sprite: mage_sprite,
        projectile: mage_projectile_sprite,
    },
    elf: {
        sprite: elf_sprite,
        projectile: elf_projectile_sprite,
    },
    enemies: {
        goblin,
        swampy,
        muddy,
    }
}

export default SPRITES;