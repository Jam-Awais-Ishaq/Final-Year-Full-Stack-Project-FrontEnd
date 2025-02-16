import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { TextField, Button } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactForm = () => {
  return (
    <div className="  text-white py-6 px-6 md:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Contact us</h2>
          <p className="text-gray-400 mb-6">Lorem ipsum dolor sit amet consectetur adipiscing elit amet diam et est pharetra porttitor libero netus nulla tempor.</p>
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-3 bg-gray-500 text-white px-4 py-2 rounded-md transition">
              <InstagramIcon className="text-xl" />
              <span>Contribute on Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-3 bg-gray-500 text-white px-4 py-2 rounded-md   transition">
              <FaLinkedinIn className="text-xl" />
              <span>Join our community</span>
            </a>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Follow us</h3>
            <div className="flex gap-4 mt-3">
              <a href="#" className="p-2   rounded-full   transition"><FaFacebookF /></a>
              <a href="#" className="p-2   rounded-full   transition"><FaTwitter /></a>
              <a href="#" className="p-2   rounded-full   transition"><FaLinkedinIn /></a>
              <a href="#" className="p-2   rounded-full   transition"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="md:w-1/2  p-6 rounded-lg">
          <form className="space-y-4">
            <div className="flex gap-4">
              <TextField label="Name" variant="outlined" fullWidth className="rounded-md"InputLabelProps={{ style: { color: "black" } }}  
                sx={{"& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "gray" },"&:hover fieldset": { borderColor: "blue" },"&.Mui-focused fieldset": { borderColor: "blue" }},"& label.Mui-focused": { color: "blue" },input: { color: "black" }}}/>

              <TextField label="Email" variant="outlined" fullWidth className="rounded-md"InputLabelProps={{ style: { color: "black" } }}  
                sx={{"& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "gray" },"&:hover fieldset": { borderColor: "blue" },"&.Mui-focused fieldset": { borderColor: "blue" }},"& label.Mui-focused": { color: "blue" },input: { color: "black" }}}/>
            </div>

            <div className="flex gap-4">
              <TextField label="Phone" variant="outlined" fullWidth className="rounded-md"InputLabelProps={{ style: { color: "black" } }}  sx={{"& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "gray" },"&:hover fieldset": { borderColor: "blue" },"&.Mui-focused fieldset": { borderColor: "blue" }},"& label.Mui-focused": { color: "blue" },input: { color: "black" }}}/>
            
              <TextField label="Subject" variant="outlined" fullWidth className="  rounded-md"InputLabelProps={{ style: { color: "black" } }}  sx={{"& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "gray" },"&:hover fieldset": { borderColor: "blue" },"&.Mui-focused fieldset": { borderColor: "blue" }},"& label.Mui-focused": { color: "blue" },input: { color: "black" }}}/>
            </div>

            <TextField label="Message" variant="outlined" multiline rows={4} fullWidth className="  rounded-md" InputLabelProps={{ style: { color: "black" } }} sx={{"& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "gray" },"&:hover fieldset": { borderColor: "blue" },"&.Mui-focused fieldset": { borderColor: "blue" }},"& label.Mui-focused": { color: "blue" },input: { color: "black" }}}/>

            <Button variant="contained" color="primary" className="w-full py-5"sx={{ backgroundColor: "blue", "&:hover": { backgroundColor: "#0044cc" } }}>Send Message</Button>
          </form>
        </div>
      </div>

      <div className="text-center text-gray-400"><h3 className="text-xl font-semibold">Prefer to reach out directly?</h3><p className="mt-2">UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>
    </div>
  );
};
export default ContactForm;