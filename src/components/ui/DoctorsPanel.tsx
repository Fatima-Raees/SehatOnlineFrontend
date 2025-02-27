import { Card, CardContent, CardMedia, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    image: "/images/WomenDr1.jpeg",
    specialization: "Cardiologist",
    rating: 4.5
  },
  {
    id: 2,
    name: "Dr. Hamza Ali",
    image: "/images/MenDr.jpeg",
    specialization: "Neurologist",
    rating: 4.2
  },
  {
    id: 3,
    name: "Dr. Ayesha Khan",
    image: "/images/WomenDr1.jpeg",
    specialization: "Cardiologist",
    rating: 4.5
  },
  {
    id: 21,
    name: "Dr. Hamza Ali",
    image: "/images/MenDr.jpeg",
    specialization: "Neurologist",
    rating: 4.2
  },
  {
    id: 4,
    name: "Dr. Ayesha Khan",
    image: "/images/WomenDr1.jpeg",
    specialization: "Cardiologist",
    rating: 4.5
  },
  {
    id: 5,
    name: "Dr. Hamza Ali",
    image: "/images/MenDr.jpeg",
    specialization: "Neurologist",
    rating: 4.2
  },
  {
    id: 6,
    name: "Dr. Ayesha Khan",
    image: "/images/WomenDr1.jpeg",
    specialization: "Cardiologist",
    rating: 4.5
  },
  {
    id: 7,
    name: "Dr. Hamza Ali",
    image: "/images/MenDr.jpeg",
    specialization: "Neurologist",
    rating: 4.2
  }

];

export default function DoctorsPanel() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ color: "text.primary", mb: 3, textAlign: "left" }}>
        Our Top Doctors
      </Typography>
      <Grid container spacing={3} justifyContent="left">
        {doctors.map((doctor) => (
          <Grid xs={12} sm={6} md={4} key={doctor.id}>
            <Card sx={{ backgroundColor: "background.paper", color: "text.primary", height: "550px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
              <CardMedia component="img" height="200" image={doctor.image} alt={doctor.name} style={{ objectFit: "contain", padding: "10px" }} />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography variant="body2">{doctor.specialization}</Typography>
                <Typography variant="body2">⭐ {doctor.rating}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
