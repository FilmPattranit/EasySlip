'use client'
import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function Page() {
  const [image, setImage]=useState<string>('')
  const [amount, setAmount]=useState<string>('')
  const [sender, setSender]=useState<string>('')
  const onImageChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.files && event.target.files[0]){
      console.log()
      setImage(URL.createObjectURL  (event.target.files[0]))
      event.target.form?.requestSubmit()
    }
  }
  async function easyslip(formData: FormData){
    const res=await fetch('/easyslip/api',{
      method: 'POST',
      body: formData
    })
    const data=await res.json()
    console.log(data)
    setAmount(data.data.data.amount.amount)
    setSender(data.data.data.sender.account.name.th)
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Easyslip
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="sm" sx={{marginTop: '10px'}}>
        {image === '' ?
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom>
            กรุณาอัพโหลดสลิป
          </Typography>
          <form action={easyslip}>
            <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
              อัพโหลดสลิป
              <input type="file" id="file" name="file" 
              onChange={onImageChange} style={{display: 'none'}}  />
            </Button> 
          </form>
        </Stack>
        :
          <Card>
            <CardMedia sx={{ height: 400, backgroundSize: 'contain' }} image={image} title="Slip Preview" />
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                ผู้โอน : {sender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                จำนวนเงิน : {amount}
              </Typography>
            </CardContent>
          </Card>
        } 
      </Container>
    </div>
  )
}
