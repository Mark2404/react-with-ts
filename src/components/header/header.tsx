import { Select } from 'antd';
import React, { useState } from 'react';
import type { SelectProps } from 'antd';
import "./index.scss";
import API from "../../API";
import { Usertype } from "../../types";

interface HeaderProps {
  setSelectedUser: (user: Usertype | null) => void;
}

const Header: React.FC<HeaderProps> = ({ setSelectedUser }) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let currentValue: string = "";

  const fetchData = async (value: string, callback: (data: { value: string; label: string }[]) => void) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    currentValue = value;

    const fake = async () => {
      try {
        const response = await API.get(`/users`, {
          params: { q: value },
        });

        if (currentValue === value) {
          const data = response.data.map((item: Usertype) => ({
            value: item.id, 
            label: item.name, 
          }));
          callback(data);
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
        callback([]);
      }
    };

    if (value) {
      timeout = setTimeout(fake, 300);
    } else {
      callback([]);
    }
  };

  const SearchInput: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
      fetchData(newValue, setData);
    };

    const handleChange = async (newValue: string) => {
      setValue(newValue);
      try {
        const response = await API.get(`/users/${newValue}`);
        setSelectedUser(response.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    return (
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={data}
        style={{ width: 200 }}
      />
    );
  };

  return (
    <header>
      <div>
        <h1 className='title'>Workers</h1>
      </div>
      <div>
        <SearchInput placeholder="Search workers..." />
      </div>
    </header>
  );
};

export default Header;
