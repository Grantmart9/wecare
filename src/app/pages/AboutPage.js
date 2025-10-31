"use client";

import * as motion from "motion/react-client"

/* -------------------------- MUI -------------------------- */
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Badge,
  Typography,
  Grid,
  Box,
  Container,
} from "@mui/material";

/* ------------------------ Local data --------------------- */
import { team } from "../data/about";
import { fadeInUp, stagger } from "../animations/about";

/* =========================================================
   AboutPage – with blue‑purple banner and a working Lottie
   ========================================================= */
export default function AboutPage() {
  return (
    <div>
      {/* -----------------------------------------------------------------
          1️⃣  Blue‑to‑purple banner (identical to the other pages)
          ----------------------------------------------------------------- */}
      <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-purple-700">
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* Banner title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
          </motion.div>

          {/* Banner subtitle */}
          <motion.p
            className="text-xl max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn more about our mission, the people behind the project and how
            we’re making a difference together.
          </motion.p>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          2️⃣  Page body – gradient background, Lottie, cards, etc.
          ----------------------------------------------------------------- */}
      <motion.main
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <Container maxWidth="lg">
          {/* ---------- Hero – simple design ---------- */}
          <Box textAlign="center" mb={8}>
            <motion.div variants={fadeInUp}>
              <Typography variant="h3" component="h1" gutterBottom>
                Our Story
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                From a handful of volunteers to a global community, we’re driven
                by transparency, collaboration, and impact.
              </Typography>
            </motion.div>
          </Box>
          {/* ---------- Team cards ---------- */}
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Meet the Team
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {team.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card sx={{ height: "100%" }} elevation={3}>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          sx={{
                            width: 64,
                            height: 64,
                            border: "2px solid",
                            borderColor: "primary.main",
                          }}
                        />
                      }
                      title={
                        <Typography variant="h6" color="text.primary">
                          {member.name}
                        </Typography>
                      }
                      subheader={
                        <Badge
                          badgeContent={member.role}
                          color="primary"
                          sx={{
                            backgroundColor: "rgba(30,143,203,0.1)",
                            color: "primary.main",
                            textWrap: "nowrap",
                            fontWeight: 500,
                          }}
                        />
                      }
                    />
                    <CardContent>
                      <Typography variant="body2">{member.bio}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </div>


          </motion.div>

          {/* ---------- Optional Mission block ---------- */}
          <Box mt={10} textAlign="center">
            <motion.div variants={fadeInUp}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>

              <Typography variant="body1" color="text.secondary">
                <strong>Empower.</strong> Provide tools, resources and mentorship
                to underserved communities. <br />
                <strong>Educate.</strong> Knowledge sharing is at the heart of
                our programs. <br />
                <strong>Inspire.</strong> Every donation, every hour of volunteer
                work, and every story fuels the next generation of changemakers.
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </motion.main>
    </div>
  );
}
