import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { TextField, Button } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactForm = () => {
  return (
    <div className="text-white py-6 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10">
        {/* Left Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact us</h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipiscing elit amet diam et est pharetra porttitor libero netus nulla tempor.
          </p>
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-3 bg-gray-500 text-white px-4 py-2 rounded-md transition hover:bg-gray-600">
              <InstagramIcon className="text-xl" />
              <span className="text-sm sm:text-base">Contribute on Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-3 bg-gray-500 text-white px-4 py-2 rounded-md transition hover:bg-gray-600">
              <FaLinkedinIn className="text-xl" />
              <span className="text-sm sm:text-base">Join our community</span>
            </a>
          </div>
          <div className="mt-6">
            <h3 className="text-lg text-slate-600 font-semibold">Follow us</h3>
            <div className="flex text-slate-600 gap-4 mt-3">
              <a href="#" className="p-2 rounded-full border-2 transition ease-in-out duration-300 hover:bg-gray-700 hover:text-white"><FaFacebookF /></a>
              <a href="#" className="p-2 rounded-full border-2 transition ease-in-out duration-300 hover:bg-gray-700 hover:text-white"><FaTwitter /></a>
              <a href="#" className="p-2 rounded-full border-2 transition ease-in-out duration-300 hover:bg-gray-700 hover:text-white"><FaLinkedinIn /></a>
              <a href="#" className="p-2 rounded-full border-2 transition ease-in-out duration-300 hover:bg-gray-700 hover:text-white"><FaInstagram /></a>
            </div>
          </div>
        </div>
        {/* Right Section (Form) */}
        <div className="md:w-1/2  rounded-lg">
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" }
                  },
                  "& label.Mui-focused": { color: "blue" },
                  input: { color: "black" }
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" }
                  },
                  "& label.Mui-focused": { color: "blue" },
                  input: { color: "black" }
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" }
                  },
                  "& label.Mui-focused": { color: "blue" },
                  input: { color: "black" }
                }}
              />
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" }
                  },
                  "& label.Mui-focused": { color: "blue" },
                  input: { color: "black" }
                }}
              />
            </div>

            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              InputLabelProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" }
                },
                "& label.Mui-focused": { color: "blue" },
                input: { color: "black" }
              }}
            />

            <Button
              variant="contained"
              color="primary"
              className="w-full py-3"
              sx={{ backgroundColor: "blue", "&:hover": { backgroundColor: "#0044cc" } }}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 mt-8">
        <h3 className="text-xl font-semibold">Prefer to reach out directly?</h3>
        <p className="mt-2 text-sm sm:text-base">
          UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;