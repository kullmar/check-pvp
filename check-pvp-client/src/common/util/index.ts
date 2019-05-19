import { Region } from "../../../../check-pvp-common/models";

export const getImageUrlPrefix = (region: Region) =>
    `https://render-${region}.worldofwarcraft.com/character/`;