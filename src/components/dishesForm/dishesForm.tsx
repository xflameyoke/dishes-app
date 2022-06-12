import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import './dishesForm.scss';

const DishesForm = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [pizza_slices, setPizzaSlices] = useState('');
  const [diameter, setDiameter] = useState('');
  const [soup_spiciness, setSoupSpiciness] = useState('');
  const [sandwich_slices, setSandwichSlices] = useState('');

  const nameSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const timeSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const typeSetHandler = (value: string) => {
    setType(value);
  };

  const pizzaSlicesSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPizzaSlices(e.target.value);
  };

  const diameterSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiameter(e.target.value);
  };

  const sandwichSlicesSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSandwichSlices(e.target.value);
  };

  const soupSpicinessSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoupSpiciness(e.target.value);
  };

  const onFinish = () => {
    const url = 'https://frosty-wood-6558.getsandbox.com:443/dishes';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        preparation_time: time,
        id: '1',
        type: type,
        no_of_slices: parseFloat(pizza_slices),
        diameter: parseFloat(diameter),
        spiciness_scale: parseFloat(soup_spiciness),
        slices_of_bread: parseFloat(sandwich_slices),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(() => {
          alert(JSON.stringify(res.status));
        });
      }
    });
  };

  const PizzaForm = (
    <>
      <Form.Item
        name="Number of slices"
        label="Number of slices"
        rules={[{ required: true }]}
      >
        <Input
          value={pizza_slices}
          type="number"
          min="2"
          max="8"
          onChange={pizzaSlicesSetHandler}
        />
      </Form.Item>
      <Form.Item name="Diameter" label="Diameter" rules={[{ required: true }]}>
        <Input
          value={diameter}
          type="number"
          min="30"
          max="60"
          step="10"
          onChange={diameterSetHandler}
        />
      </Form.Item>
    </>
  );

  const SoupForm = (
    <>
      <Form.Item
        name="Spiceness level"
        label="Spiceness level"
        rules={[{ required: true }]}
      >
        <Input
          type="number"
          min="1"
          max="10"
          step="1"
          value={soup_spiciness}
          onChange={soupSpicinessSetHandler}
        />
      </Form.Item>
    </>
  );

  const SandwichForm = (
    <>
      <Form.Item
        name="Slices of bread"
        label="Slices of bread"
        rules={[{ required: true }]}
      >
        <Input
          value={sandwich_slices}
          type="number"
          min="1"
          step="1"
          onChange={sandwichSlicesSetHandler}
        />
      </Form.Item>
    </>
  );

  return (
    <div className="dishes">
      <Form className="dishes__form" name="dishes" onFinish={onFinish}>
        <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
          <Input
            value={name}
            onChange={nameSetHandler}
            placeholder="Dish name"
          />
        </Form.Item>
        <Form.Item
          name="Preparation Time"
          label="Preparation time:"
          rules={[{ required: true }]}
        >
          <Input value={time} type="time" step="1" onChange={timeSetHandler} />
        </Form.Item>
        <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
          <Select
            showSearch
            allowClear
            value={type}
            onChange={typeSetHandler}
            placeholder="Select type"
          >
            <Select.Option rules={[{ required: true }]} value="pizza">
              Pizza
            </Select.Option>
            <Select.Option value="soup">Soup</Select.Option>
            <Select.Option value="sandwich">Sandwich</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          {type === 'pizza' ? PizzaForm : ''}
          {type === 'soup' ? SoupForm : ''}
          {type === 'sandwich' ? SandwichForm : ''}
        </Form.Item>

        <Button type="dashed" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DishesForm;
