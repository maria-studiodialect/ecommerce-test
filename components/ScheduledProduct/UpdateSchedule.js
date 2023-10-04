import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Button from '../common/Button'
import { Close } from '../common/icons/Close'
import ProductForm from '../ProductForm'

const UpdateSchedule = ({ products, ...props }) => {
  const cron = require('node-cron');

  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });
  /*
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const inputDate = new Date(date);
    // Format the date in the "YYYY-MM-DDT00:00:00.000Z" format
    const formattedDate = inputDate.toISOString()
    console.log(formattedDate)
    try {
      for (const product of products) {
        await fetch(`/api/scheduledProducts/updateProduct`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product.id, scheduleDate: formattedDate }),
        });
      }
      //handleClose();
      //window.location.reload();
      console.log(date)
    } catch (error) {
      console.error(error);
    }
  };
  */
  return (
    <></>
  )
}

export default UpdateSchedule
