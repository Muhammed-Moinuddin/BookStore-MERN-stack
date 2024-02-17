import { AppBar, Box, Toolbar, Typography, IconButton, ButtonGroup, Button, CssBaseline, Drawer, Divider, List, ListItem} from '@mui/material';
import {TableChartOutlined, StyleOutlined} from '@mui/icons-material';

const ViewTypeButton = ({onViewTypeChange}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{pt: 4}}>
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button startIcon={<TableChartOutlined />} color='info' onClick={() => onViewTypeChange('table')}>Table View</Button>
            <Button startIcon={<StyleOutlined />} color='info' onClick={() => onViewTypeChange('card')}>Card View</Button>
        </ButtonGroup>
    </Box>
  )
}

export default ViewTypeButton;