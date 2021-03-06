//author kai

import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';



let image = null;

// const fs = require('fs');
// const { createInstance } = require('polotno-node');

// async function run() {
//   const instance = await createInstance({
//     key: 'nFA5H9elEytDyPyvKL7T',
//   });

//   const json = JSON.parse(fs.readFileSync(work.content.pages[0]));

//   const imageBase64 = await instance.jsonToImageBase64(json); // by default it will be png image
//   // write image into local file
//   fs.writeFileSync('out.png', imageBase64, 'base64');

//   // also we can export design into lower size
//   // and change image type
//   const jpegImage = await instance.jsonToImageBase64(json, {
//     pixelRatio: 0.5, // make image twice smaller
//     mimeType: 'image/jpeg',
//   });
//   fs.writeFileSync('out.jpg', jpegImage, 'base64');

//   // close instance
//   instance.close();
// }




function WorkCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { work } = props;

    // let image = null;
    
    // // const { createInstance } = require('polotno-node');
    // // const fs = require('fs');

    // function run() {
    //     console.log("kkkkkkkkkkkkk");
    //     // const { createInstance } = require('polotno-node');
    //     // const instance = createInstance({
    //     //     key: 'nFA5H9elEytDyPyvKL7T',
    //     // });

    //     // const json = JSON.parse(fs.readFileSync(work.content.pages[0]));

    //     // console.log(json);
    //     // image = instance.jsonToImageBase64(json);
    //     // instance.close();
    // }

    // run();


    function handleOpen(event, id){
        event.stopPropagation();
        console.log(id);
        store.readWork(id);
        auth.setTargetUser(work.authorId);
       
    }

    async function handleDeleteWork(event, id) {
        event.stopPropagation();
        store.markWorkForDeletion(id);
    }
    
    
    
    let deletebutton=
    <IconButton  onClick={(event) => {
        handleDeleteWork(event, work._id)
        }} aria-label='delete'>
        <DeleteIcon/>
    </IconButton>;
    
    if(auth.user===null){
        deletebutton="";
    }
    else if(auth.user._id!==work.author || store.mode!=="user"){
        deletebutton=
        "";
    }

    var url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU";
    var bookUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU";
    
    let response=url;
    if(work.workType==0) {response=bookUrl};
  
    
    let workElement =
        <Card key={'card'+work.id} id={work.id} hoverable="true" sx={{ position:"static",width:"20%",height:"100%",margin:"2.5%" }} onClick={(event) => {handleOpen(event, work._id)}}>
            {deletebutton}
            <CardMedia
                component="img"
                height="140"
                image= {work.content[0]}
                alt= {work.name}
            />
           
                <Box display="flex" sx={{bgcolor:"#C39BD3",position:"relative",width:"100%",height:"25%"}}> 
                <Typography paddingRight="20%" >
                    {work.name}
                </Typography>
                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                <Typography >
                    {work.view}
                </Typography>
                <ThumbUpIcon size='20%'></ThumbUpIcon>
                <Typography>
                    {work.likes.length}
                </Typography>
                <Avatar alt={work.author} src={work.avatar} />
                </Box>
        </Card>
    return (
        workElement
    );
}

export default WorkCard;