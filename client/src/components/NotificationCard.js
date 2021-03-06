import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function NotificationCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { infor } = props;
    console.log(infor);

    function handleOpen(event, id){
        event.stopPropagation();
        console.log(id);
        store.readWork(id);
        auth.ignoreWork(id);
    }

    function handleIgnore(event, id){
        event.stopPropagation();
        console.log(id);
        auth.ignoreWork(id);
    }
    
    let viewbutton=
    <Button  onClick={(event) => {
        console.log(infor);
        handleOpen(event, infor.workId)
        }} aria-label='view' size='small'>
    View
    </Button>;

    let ignorebutton=
    <Button  onClick={(event) => {
        handleIgnore(event, infor.workId)
        }} aria-label='ignore' size='small'>
    Ignore
    </Button>;

    let element = 
    <Box id='NotificationCard'   width='100%' height='100%' marginTop='5%'>
        <Box id='NotificationType' height='20%'>
            <Typography fontSize='15px'>
            Check out the new work post by: 
            </Typography>
        </Box>
        <Box id='NotificationName' display='flex' height='50%' marginTop='2%'>
            <Avatar alt={infor.user} src={infor.avatar} />
            <Box id='NotificationCard_name' sx={{textAlign:'center',position:'relative',width:'70%',height:'100%',paddingTop:'4%'}}> {infor.userName}</Box>
        </Box>
        <Box id='NotificationButton' alignContent='center' display='flex' height='25%'>
            {viewbutton}
            {ignorebutton}
        </Box>
    </Box>;
    
    let cardElement =
        <Box sx={{height:100,width:'100%',bgcolor:'#47D366'}}>     
               {element}
        </Box>
    return (
        cardElement
    );
}

export default NotificationCard;