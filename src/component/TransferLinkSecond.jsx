import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { UpdateFriend, useFetch } from "../utils/firebase";
import UpdateModal from "./UpdateModal";
import { Box } from "@mui/material";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferListFirst() {
  const { friendList } = useFetch();
  const letter = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "R",
    "S",
    "T",
    "U",
    "V",
    "Y",
    "Z",
    "W",
    "X",
  ];
  const [open, setOpen] = React.useState(false);
  const [isVisible, setİsVisible] = React.useState(true);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(letter);
  const [right, setRight] = React.useState(friendList || []);
  const [groupTitle, setGroupTitle] = React.useState("Group 2");

  React.useEffect(() => {
    UpdateFriend(right);
  }, [right]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const customList = (title, items) =>
    friendList && (
      <Card>
        <CardHeader sx={{ px: 2, py: 1 }} title={title} />
        <Divider />
        <List
          sx={{
            width: 200,
            height: 230,
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );

  return (
    <>
      {isVisible && (
        <Box
          sx={{ border: "1px solid green", width: "80%", margin: "1rem auto" }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Grid item>{customList("Friends", left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList(groupTitle, right)}</Grid>
          </Grid>
          <Button
            variant="contained"
            color="success"
            sx={{ marginY: "1rem" }}
            onClick={() => setOpen(true)}
          >
            Edit Title
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ marginX: "1rem" }}
            onClick={() => setİsVisible(false)}
          >
            Delete
          </Button>
          <UpdateModal
            open={open}
            setOpen={setOpen}
            groupTitle={groupTitle}
            setGroupTitle={setGroupTitle}
          />
        </Box>
      )}

      {!isVisible && (
        <Button
          variant="contained"
          color="success"
          sx={{ marginY: "1rem" }}
          onClick={() => setİsVisible(true)}
        >
          OPEN {groupTitle}
        </Button>
      )}
    </>
  );
}
