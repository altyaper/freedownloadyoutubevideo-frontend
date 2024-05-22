import { Button, TableCell, TableRow } from "@mui/material";
import { AudioR } from "../models/VideoResponse";

interface AudioRowProps {
  audio: AudioR
}

export const AudioRow = ({ audio }: AudioRowProps) => {

  const handleOnDownloadAudio = () => {
    console.log('Download audio: ', audio);
  }
  
  return (
    <TableRow
      key={audio.url}
    >
      <TableCell component="th" scope="audio">
        <strong>{audio.quality}</strong>
      </TableCell>
      <TableCell component="th" scope="audio">
        <strong>{audio.mimeType}</strong>
      </TableCell>
      <TableCell align="right">
        <Button variant='contained' onClick={handleOnDownloadAudio}>
          Download
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default AudioRow;