import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

type CardProps = {
  description: string;
  icon: string;
  title: string;
  routePath: string;
};

function DashBoardCard({ title, description, icon, routePath }: CardProps) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Avatar className="bg-white mt-4 ml-5" aria-label="comparison">
        <img src={icon} alt="comparison" />
      </Avatar>
      <CardHeader title={title} />
      <Divider variant="middle" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="secondary"
          className="w-full"
          onClick={() => navigate(routePath)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default DashBoardCard;
