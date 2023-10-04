import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Button from '../common/Button'
import { Close } from '../common/icons/Close'
import ProductForm from '../ProductForm'

const UpdateSchedule = ({ products, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(null)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const Mergent = require("mergent");
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const inputDate = new Date(date);
    // Format the date in the "YYYY-MM-DDT00:00:00.000Z" format
    const formattedDate = inputDate.toISOString();
    console.log(formattedDate);

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

      /*
      const existingTask = await mergent.tasks.find({
        request: {
          url: "YOUR_CRON_JOB_HANDLER_URL", // Replace with your cron job handler URL
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hello: "world" }), // Customize the body as needed
        },
      });

      if (existingTask) {
        // Update the existing Mergent task with the new scheduling information
        await mergent.tasks.update(existingTask.id, {
          delay: { minutes: 5 }, // Update the delay as needed
        });
      } else {
       */
        // If the task doesn't exist, create a new one
      const currentDate = new Date();
      const targetDate = new Date(formattedDate);
      const delayMilliseconds = targetDate - currentDate;

      if (delayMilliseconds > 0) {
        // Schedule a cron job using Mergent with the calculated delay
        const mergent = new Mergent("BRZwxwOf70ydG46zuQ9d");
        await mergent.tasks.create({
          queue: 'scheduled_1',
          request: {
            url: "https://ecommerce-test-blond.vercel.app/api/products/createProduct", // Replace with your cron job handler URL
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(products), // Customize the body as needed
          },
          delay: { milliseconds: delayMilliseconds }, // Use the calculated delay
        });
      }

      handleClose();
      window.location.reload();
      console.log(date);
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
