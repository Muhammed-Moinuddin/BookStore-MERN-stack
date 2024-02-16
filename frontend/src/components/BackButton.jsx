import { Link } from 'react-router-dom';
import {ArrowBack} from '@mui/icons-material';
import {Button} from '@mui/material';

const BackButton = ({destination = '/'}) => {
  return (
    <Button component={Link} to={destination} startIcon={<ArrowBack/>} variant="outlined" color="success" sx={{mb: 3}}>Back to Dashboard</Button>
  )
}

export default BackButton;