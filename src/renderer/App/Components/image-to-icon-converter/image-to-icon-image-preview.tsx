import { Container, Typography } from "@mui/material";
import { Image } from "@shared/components/image/image";

type ImagePreviewProps = {
  imageSrc: string;
  filePath: string;
};

export function ImagePreview(props: ImagePreviewProps) {
  return (
    <Container maxWidth="md">
      <Typography variant="subtitle1" gutterBottom>
        <Typography variant="h6">Preview</Typography>
      </Typography>
      <Image src={props.imageSrc} label={`File: ${props.filePath}`} fillSpace />
    </Container>
  );
}
