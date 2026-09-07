import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
import { MENG_TO_SKETCHBOOK_TYPOGRAPHY } from "./pageRecipes";

export type MengToSketchbookLandingPageProps = LandingPageProps & PageTypographyProps;

export function MengToSketchbookLandingPage(props: MengToSketchbookLandingPageProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MENG_TO_SKETCHBOOK_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Meng To — Singapore Sketchbook"
      sourceUrl="/landing-pages/meng-to-sketchbook.html"
    />
  );
}

export { LandingPageFrame } from "./LandingPageFrame";
export type { LandingPageFrameProps, LandingPageProps } from "./LandingPageFrame";
