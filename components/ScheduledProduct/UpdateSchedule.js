import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Button from '../common/Button'
import { Close } from '../common/icons/Close'
import ProductForm from '../ProductForm'
import Mergent from 'mergent'

const UpdateSchedule = ({ products, originalProducts, profiles, originalProfiles, location, liveLocation, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(null)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const Mergent = require("mergent");


  const insertProducts = products.map((product) => ({
    insert: {
      table: 'products',
      record: {
        ...product,
        location: { id: liveLocation }, // Modify the location here
      },
    },
  }));

  const deleteProducts = originalProducts.map((originalProduct) => ({
    delete: {
      table: 'products',
      id: originalProduct.id, // Use the unique identifier for each product
    },
  }));

  const insertConfig = profiles.map((profile) => ({
    insert: {
      table: 'configProfiles',
      record: {
        ...profile,
        location: { id: liveLocation }, // Modify the location here
      },
    },
  }));

  const deleteConfig = originalProducts.map((originalProfile) => ({
    delete: {
      table: 'configProfiles',
      id: originalProfile.id, // Use the unique identifier for each product
    },
  }));

  const combinedActions = [...deleteProducts, ...insertProducts, ...insertConfig, ...deleteConfig];

  console.log(combinedActions)
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const inputDate = new Date(date);
    // Format the date in the "YYYY-MM-DDT00:00:00.000Z" format
    const formattedDate = inputDate.toISOString();
    console.log(formattedDate);

    try {
        await fetch(`/api/locations/updateLocation`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: location, scheduleDate: formattedDate }),
        });

      const mergent = new Mergent("BRZwxwOf70ydG46zuQ9d");

      // Get the list of tasks
      const tasks = await mergent.tasks.list();


      // Check if a task with queue 'scheduled_1' already exists
      const existingTask = tasks.find(task => (task.queue === 'transaction' && task.status === 'queued'));

      if (existingTask) {
        // Update the existing task
        const updatedTask = await mergent.tasks.update(existingTask.id, {
          scheduled_for: formattedDate,
          // Other updates as needed
        });
        console.log("Task updated:", updatedTask);
      } else {
        await mergent.tasks.create({
          queue: 'transaction',
          request: {
            url: "https://ecommerce-test-blond.vercel.app/api/transation",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(combinedActions),
          },
          scheduled_for: formattedDate,
        });
      }

      handleClose();
      // window.location.reload();
      // console.log(date);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <Button onClick={handleOpen} type="button" {...props}>
        Update
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="mb-5 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800"
                  >
                    <h3>Update Product</h3>
                    <Close onClick={handleClose} />
                  </Dialog.Title>
                  <form onSubmit={onFormSubmit}>
                    <label htmlFor="Publish Date">Publish Date: </label>
                    <input
                      type="datetime-local"
                      id="publishDate"
                      name="publishDate"
                      value={date}
                      onChange={handleDateChange}
                      className='mr-2 border rounded'
                    />
                    <input type="submit" value="Submit" />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpdateSchedule
