import { Container, Typography } from "@mui/material";
import { FlexContainer } from "@shared/components/flex-container/flex-container";
import { Subheading } from "@shared/components/heading/heading";
import { Image } from "@shared/components/image/image";

type ImagePreviewProps = {
  imageSrc: string;
  filePath: string;
};

export function ImagePreview(props: ImagePreviewProps) {
  return (
    <Container maxWidth="md">
      <Subheading>
        <Typography variant="h6">Preview</Typography>
      </Subheading>
      <FlexContainer>
        <Image src={props.imageSrc} label={`File: ${props.filePath}`} fillSpace />
      </FlexContainer>
    </Container>
  );
}
