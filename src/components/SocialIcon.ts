// Maps profile.json social link ids to Icon names.
export const socialIcon = {
  linkedin: "linkedin",
  github: "github",
  symfony: "code",
  medium: "pen",
  stackoverflow: "layers",
} as const;

export type SocialId = keyof typeof socialIcon;
