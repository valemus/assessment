import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Geldeinlage } from '../../../types/types';

type Props = {
  fundings: Geldeinlage[];
  onEdit: (funding: Geldeinlage) => void;
};

export const FundingTable = ({ fundings, onEdit }: Props) => {
  return (
    <Box mt={6}>
      <Typography variant="h5" component="div" sx={{ my: 2 }}>
        Erfasste Geldeinlagen
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Zeilennummer</TableCell>
              <TableCell align="right">Datum</TableCell>
              <TableCell align="right">Bezeichnung</TableCell>
              <TableCell align="right">Kategorie</TableCell>
              <TableCell align="right">Betrag</TableCell>
              <TableCell align="right">Geldgeber</TableCell>
              <TableCell align="right">Notizen</TableCell>
              <TableCell align="right">Öffnen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundings.map((funding, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{i + 1}</TableCell>
                <TableCell align="right">{funding.datum}</TableCell>
                <TableCell align="right">{funding.bezeichnung}</TableCell>
                <TableCell align="right">{funding.kategorie}</TableCell>
                <TableCell align="right">{funding.betrag}</TableCell>
                <TableCell align="right">{funding.geldgeber}</TableCell>
                <TableCell align="right">
                  {funding.notizen && (
                    <Tooltip title={funding.notizen} sx={{ cursor: 'pointer' }}>
                      <ChatBubbleIcon />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button variant="text" onClick={() => onEdit(funding)}>
                    Bearbeiten
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
