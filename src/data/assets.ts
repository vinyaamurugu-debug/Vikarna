// Asset image registry with zero-broken-image fallback assurance
import heroCoverImg from '../assets/images/vikarna_hero_cover_1791220471566.jpg';
import avatarImg from '../assets/images/vikarna_avatar_portrait_1791220482990.jpg';
import adventureMapImg from '../assets/images/vikarna_adventure_map_1791220493987.jpg';
import sceneCowFarmImg from '../assets/images/vikarna_investigation_scene_1791220507214.jpg';
import princeAvatarImg from '../assets/images/vikarna_prince_avatar_1791221682280.jpg';

// Dedicated mystery scene background illustrations
import sceneBrokenPotImg from '../assets/images/scene_broken_pot_1791263504891.jpg';
import sceneMissingParrotImg from '../assets/images/scene_missing_parrot_1791263517839.jpg';
import sceneEmptyWellImg from '../assets/images/scene_empty_well_1791263530539.jpg';
import sceneMissingArrowsImg from '../assets/images/scene_missing_arrows_1791263539714.jpg';
import sceneFruitBasketImg from '../assets/images/scene_fruit_basket_1791263550002.jpg';
import sceneTempleBellImg from '../assets/images/scene_temple_bell_1791263560601.jpg';
import sceneLostNecklaceImg from '../assets/images/scene_lost_necklace_1791263572050.jpg';
import sceneDarkCloudsImg from '../assets/images/scene_dark_clouds_1791263583215.jpg';
import sceneMissingScrollImg from '../assets/images/scene_missing_scroll_1791263595676.jpg';

export const ASSETS = {
  heroCover: heroCoverImg,
  avatar: avatarImg,
  princeAvatar: princeAvatarImg,
  adventureMap: adventureMapImg,
  sceneFarm: sceneCowFarmImg,
  // Mystery-specific backdrops
  sceneBrokenPot: sceneBrokenPotImg,
  sceneMissingParrot: sceneMissingParrotImg,
  sceneEmptyWell: sceneEmptyWellImg,
  sceneMissingArrows: sceneMissingArrowsImg,
  sceneFruitBasket: sceneFruitBasketImg,
  sceneTempleBell: sceneTempleBellImg,
  sceneLostNecklace: sceneLostNecklaceImg,
  sceneDarkClouds: sceneDarkCloudsImg,
  sceneMissingScroll: sceneMissingScrollImg,
};

export const MYSTERY_SCENES: Record<string, string> = {
  'mystery-1': sceneCowFarmImg,
  'mystery-2': sceneBrokenPotImg,
  'mystery-3': sceneMissingParrotImg,
  'mystery-4': sceneEmptyWellImg,
  'mystery-5': sceneMissingArrowsImg,
  'mystery-6': sceneFruitBasketImg,
  'mystery-7': sceneTempleBellImg,
  'mystery-8': sceneLostNecklaceImg,
  'mystery-9': sceneDarkCloudsImg,
  'mystery-10': sceneMissingScrollImg,
};

export function getMysteryScene(mysteryId: string): string {
  return MYSTERY_SCENES[mysteryId] || sceneCowFarmImg;
}
