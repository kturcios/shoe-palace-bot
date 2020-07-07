import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useBillingProfilesState } from '../contexts/BillingProfilesContext';
import { useTasksState, useTasksDispatch } from '../contexts/TasksContext';
import {
  LIST_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  EXECUTE_TASK,
} from '../shared/constants';
import ShippingForm from '../components/ShippingForm';
import useShippingState from '../hooks';

const { ipcRenderer, logger } = window;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    width: '100%',
  },
}));

export default function TaskContent() {
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  return (
    <Grid
      container
      xs={12}
      direction="column"
    >
      <ShippingForm
        shipping={shipping}
        setShipping={setShipping}
      />
    </Grid>
  );
}

// export default function TaskContent() {
//   const classes = useStyles();
//   // const [tasks, setTasks] = useState([]);
//   const { billingProfiles } = useBillingProfilesState();
//   const dispatch = useTasksDispatch();
//   const {
//     isNew,
//     selectedTaskIndex,
//     task,
//     tasks,
//   } = useTasksState();
//   useEffect(() => {
//     logger.info('Task effect: ', JSON.stringify(task, null, 2));
//   }, [task]);
//   const {
//     store,
//     url,
//     size,
//     quantity,
//     billingProfileId,
//   } = task;
//   // useEffect(() => {
//   //   if (billingProfiles.length === 0) {
//   //     dispatch({
//   //       type: 'TASK_FIELD_UPDATE',
//   //       billingProfileId,,
//   //       value: event.target.value,
//   //     });
//   //   }
//   // }, [billingProfiles]);
//   const handleCancelClick = async () => {
//     dispatch({ type: 'CANCEL' });
//   };
//   const fetchTasks = async () => {
//     try {
//       const taskList = await ipcRenderer.invoke(LIST_TASKS);
//       dispatch({
//         type: 'UPDATE_TASKS_LIST',
//         task: taskList,
//       });
//       // setTasks(taskList);
//     } catch (err) {
//       logger.error(`Failed to fetch tasks: ${err}`);
//     }
//   };
//   const handleClickDelete = async () => {
//     const deleteId = tasks[selectedTaskIndex].id;
//     try {
//       await ipcRenderer.invoke(DELETE_TASK, deleteId);
//       dispatch({ type: 'RESET' });
//     } catch (err) {
//       logger.error(`Failed to delete task ${deleteId}: ${err}`);
//     } finally {
//       fetchTasks();
//     }
//   };
//   const handleClickNew = async () => {
//     dispatch({ type: 'NEW' });
//   };
//   const handleTaskFieldUpdate = (field) => (event) => {
//     dispatch({
//       type: 'TASK_FIELD_UPDATE',
//       field,
//       value: event.target.value,
//     });
//   };
//   const handleClickSave = async () => {
//     try {
//       await ipcRenderer.invoke(CREATE_TASK, task);
//       dispatch({ type: 'RESET' });
//     } catch (err) {
//       logger.error(err);
//     } finally {
//       fetchTasks();
//     }
//   };
//   const handleClickUpdate = async () => {
//     try {
//       await ipcRenderer.invoke(UPDATE_TASK, task);
//     } catch (err) {
//       logger.error(err);
//     } finally {
//       fetchTasks();
//     }
//   };
//   const handleClickExecute = async () => {
//     try {
//       const [billingProfile] = billingProfiles.filter((bp) => billingProfileId === bp.id);
//       await ipcRenderer.invoke(EXECUTE_TASK, task, billingProfile);
//       dispatch({ type: 'RESET' });
//     } catch (err) {
//       logger.error(err);
//     }
//   };
//   useEffect(() => {
//     logger.info('Tasks: ', tasks);
//     logger.info('selected task index: ', selectedTaskIndex);
//     logger.info('Switching tasks...', JSON.stringify(tasks[selectedTaskIndex], null, 2));
//     if (selectedTaskIndex !== null) {
//       dispatch({
//         type: 'SWITCH_TASK',
//         task: tasks[selectedTaskIndex],
//         // task: {
//         //   ...tasks[selectedTaskIndex],
//         // },
//       });
//     }
//   }, [selectedTaskIndex]);
//   useEffect(() => {
//     logger.info('Billing profiles: ', billingProfiles);
//   }, [billingProfiles]);
//   useEffect(() => {
//     fetchTasks();
//   }, []);
//   return (
//     <Grid
//       container
//       spacing={3}
//       direction="column"
//     >
//       <Grid
//         item
//         xs={12}
//         container
//         alignItems="center"
//       >
//         <Grid item xs={8}>
//           <FormControl
//             className={classes.formControl}
//             disabled={isNew}
//           >
//             <InputLabel>Task</InputLabel>
//             <Select
//               value={selectedTaskIndex}
//               onChange={(event) => dispatch({
//                 type: 'UPDATE_TASK_INDEX',
//                 selectedTaskIndex: event.target.value,
//               })}
//             >
//               {tasks.map((bp, index) => <MenuItem value={index}>{`${bp.store} - ${bp.id}`}</MenuItem>)}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={2} />
//         <Grid item xs={2}>
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleClickNew}
//           >
//             NEW
//           </Button>
//         </Grid>
//       </Grid>
//       {(selectedTaskIndex !== null || isNew) && (
//         <Grid
//           item
//           xs={12}
//           container
//           spacing={3}
//           justifyContent="center"
//         >
//           <Grid
//             item
//             xs={12}
//             container
//             direction="column"
//           >
//             <FormControl>
//               <InputLabel>Store</InputLabel>
//               <Select
//                 value={store}
//                 onChange={handleTaskFieldUpdate('store')}
//               >
//                 <MenuItem value="Shoe Palace">Shoe Palace</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label="URL"
//               value={url}
//               onChange={handleTaskFieldUpdate('url')}
//             />
//             <TextField
//               label="Size"
//               value={size}
//               onChange={handleTaskFieldUpdate('size')}
//             />
//             <TextField
//               label="Quanity"
//               value={quantity}
//               onChange={handleTaskFieldUpdate('quantity')}
//             />
//             <FormControl>
//               <InputLabel>Billing Profile</InputLabel>
//               <Select
//                 value={billingProfileId}
//                 onChange={handleTaskFieldUpdate('billingProfileId')}
//               >
//                 {billingProfiles.map((profile) => (
//                   <MenuItem value={profile.id}>{profile.id}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             container
//             direction="row-reverse"
//           >
//             {(selectedTaskIndex !== null || isNew) && (
//               <>
//                 {!isNew && (
//                   <>
//                     <Button
//                       variant="contained"
//                       onClick={handleClickExecute}
//                     >
//                       EXECUTE
//                     </Button>
//                     &nbsp;
//                     &nbsp;
//                   </>
//                 )}
//                 <Button
//                   variant="contained"
//                   onClick={isNew ? handleClickSave : handleClickUpdate}
//                 >
//                   {isNew ? 'SAVE' : 'UPDATE'}
//                 </Button>
//               &nbsp;
//               &nbsp;
//                 <Button
//                   variant="contained"
//                   onClick={isNew ? handleCancelClick : handleClickDelete}
//                 >
//                   {isNew ? 'CANCEL' : 'DELETE'}
//                 </Button>
//               </>
//             )}
//           </Grid>
//         </Grid>
//       )}
//     </Grid>
//   );
// }
