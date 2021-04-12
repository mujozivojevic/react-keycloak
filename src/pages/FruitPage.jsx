
import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
const useStyles = makeStyles({
    table: {
      maxWidth: 200,
    },
  });

export function FruitPage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/fruit', { headers: 
        { "Authorization": "Bearer " + localStorage.getItem("react-token"),
      },

      }
      );
      setData(result.data);
    };
    fetchData();
  }, []);


    const classes = useStyles();

    
    return <div className="Content">

        <h3>Fruit list</h3>
        <br/><br/><br/>
      <br/><br/><br/>

        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table" data-testid={`table`}>
          <TableHead>
            <TableRow>
              <TableCell >Id</TableCell>
              <TableCell >Name</TableCell>
              <TableCell >Price</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((data) => (
          <TableRow key={data.id}>
                <TableCell>
                  {data.id}
                </TableCell>
                <TableCell align="left">{data.name}</TableCell>
                <TableCell align="left">{data.price}</TableCell>
                <TableCell align="left">
                <Button variant="contained" color="secondary" >X</Button>
                </TableCell>
              </TableRow>
 ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/><br/><br/>
        </div>
   }

export default FruitPage;

/*

*/