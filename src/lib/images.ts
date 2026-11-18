/**
 * Photo catalogue. Every image on the site is referenced by key from here,
 * so swapping placeholder photography for the client's licensed photos is
 * a matter of changing URLs in this one file (or pointing them at files in
 * /public/images).
 *
 * Current photos are from Unsplash and are placeholders only.
 */
const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const photos = {
  ellaTrain: unsplash("photo-1552465011-b4e21bf6e79a"),
  sigiriya: unsplash("photo-1546708973-b339540b5162"),
  stiltFishermen: unsplash("photo-1580674684081-7617fbf3d745"),
  beachSunset: unsplash("photo-1507525428034-b723cf961d3e"),
  mountains: unsplash("photo-1506905925346-21bda4d32df4"),
  resortPool: unsplash("photo-1566073771259-6a8506099945"),
  teaBungalow: unsplash("photo-1571896349842-33c89424de2d"),
  lagoonVilla: unsplash("photo-1520250497591-112f2f40a3f4"),
  travellerPortrait: unsplash("photo-1438761681033-6461ffad8d80", 200),
  memberPortrait: unsplash("photo-1494790108377-be9c29b29330", 200),
} as const;

export type PhotoKey = keyof typeof photos;
