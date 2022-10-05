import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardHeader,
  CardActions,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import Input from '../components/Input';
import {
  createProject,
  editProject,
  removeProjects,
} from '../store/projects/actions';
import {
  projectsCountSelector,
  projectsSelector,
} from '../store/projects/selectors';
import { Delete, Edit } from '@mui/icons-material';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({
    name: '',
    description: '',
    id: null,
    mode: 'create',
  });
  const dispatch = useDispatch();
  const projects = useSelector(projectsSelector);
  const projectsCount = useSelector(projectsCountSelector);

  function handleClose() {
    setIsOpen(false);

    setItem({
      name: '',
      description: '',
      id: null,
      mode: 'create',
    });
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h3" component="h1">
          My ToDo({projectsCount})
        </Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Create project
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {projects.map(({ id, name, description }) => {
          return (
            <Box key={id} width={250}>
              <Card>
                <CardHeader title={name} subheader={description} />
                <CardActions>
                  <Edit
                    onClick={() => {
                      setIsOpen(true);
                      setItem({
                        name,
                        description,
                        id,
                        mode: 'edit',
                      });
                    }}
                  />
                  <Delete
                    onClick={() => {
                      dispatch(removeProjects({ id }));
                    }}
                  />
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>

      <Dialog fullWidth open={isOpen} onClose={handleClose}>
        <DialogTitle>Create project</DialogTitle>
        <DialogContent>
          <Formik
            validationSchema={yup.object().shape({
              name: yup.string().label('Name').min(4).max(20).required(),
              description: yup
                .string()
                .label('Description')
                .min(10)
                .max(50)
                .required(),
            })}
            enableReinitialize
            initialValues={{ name: item.name, description: item.description }}
            onSubmit={({ name, description }, { resetForm }) => {
              if (item.mode === 'create') {
                dispatch(
                  createProject({
                    project: {
                      name,
                      description,
                      id: nanoid(),
                    },
                  })
                );
              } else {
                dispatch(
                  editProject({
                    project: {
                      name,
                      description,
                      id: item.id,
                    },
                  })
                );
              }

              setItem({
                name: '',
                description: '',
                id: null,
                mode: 'create',
              });
              resetForm();
              handleClose();
            }}
          >
            <Form>
              <Box sx={{ paddingTop: '16px' }}>
                <Stack direction="column" spacing={2}>
                  <FormControl fullWidth>
                    <Input name="name" label="Name" />
                  </FormControl>
                  <FormControl fullWidth>
                    <Input name="description" label="Description" />
                  </FormControl>
                  <Button type="submit" variant="contained">
                    {item.mode === 'create' ? 'Create' : 'Edit'}
                  </Button>
                </Stack>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
