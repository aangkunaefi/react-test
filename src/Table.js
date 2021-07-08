/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, React } from 'react';
import { Table as BootstrapTable, Button } from 'react-bootstrap';
import { deleteUser, getUsers } from './api';
import UserForm from './UserForm'

const Table = () => {

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);

  const getData = () => {
    getUsers().then(({ data }) => {
      setTableData(data);
      setLoading(false);
      setDeleting(false);
      setSortedColumn(null);
    });
  }

  useEffect(() => {
    const initData = () => getData();
    initData();
  }, []);

  const onDelete = (userId) => () => {
    setDeleting(true);
    deleteUser(userId).then(getData);
  }

  const renderRow = (item, index) => {
    return <tr key={item.user_id}>
      <td width="60" className="text-center">{index + 1}</td>
      <td>
        <a onClick={openModal(item.user_id)} className="text-warning" href="">{item.user_name}</a>
      </td>
      <td width="120" className="text-right">{item.score}</td>
      <td className="text-center">{item.registered.match(/\d+-\d+-\d+/g)[0]}</td>
      <td width="100" className="text-center py-2">
        <Button 
          disabled={deleting} 
          onClick={onDelete(item.user_id)} 
          className="btn-delete" 
          size="sm" 
          variant="danger">
            {deleting ? 'Deleting..' : 'Delete'}
        </Button>
      </td>
    </tr>
  }
  

  const sortBy = (column) => () => {
    setSortedColumn(column);
    const result = !isNaN(tableData[0][column])
    ? tableData.sort((a, b) => parseInt(a[column]) - parseInt(b[column])) 
    : tableData.sort((a, b) => a[column].localeCompare(b[column]));
    !ascendingSort && result.reverse();
    setAscendingSort(!ascendingSort);
    setTableData(JSON.parse(JSON.stringify(result)));
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const openModal = (userId) => (event) => {
    !!event && typeof event.preventDefault == 'function' && event.preventDefault();
    setCurrentId(userId);
    toggleModal();
  }

  return <div>
    <div className="d-flex mb-4 justify-content-between">
      <h1 className="h3 font-weight-bold m-0">User Data</h1>
      <Button variant="primary" onClick={openModal(null)}>+ New User</Button>
    </div>
    <BootstrapTable striped responsive bordered hover variant="dark">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th onClick={sortBy('user_name')} className={`cursor-pointer ${sortedColumn === 'user_name' ? 'sort-'+(ascendingSort ? 'asc' : 'desc') : ''}`}>Name</th>
          <th onClick={sortBy('score')} className={`cursor-pointer text-right ${sortedColumn === 'score' ? 'sort-'+(ascendingSort ? 'asc' : 'desc') : ''}`}>Score</th>
          <th onClick={sortBy('registered')} className={`cursor-pointer text-center ${sortedColumn === 'registered' ? 'sort-'+(ascendingSort ? 'asc' : 'desc') : ''}`}>Registered</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {loading && <tr>
          <td align="center" colSpan="5">Fetching data..</td>
        </tr>}
        {!loading && tableData.length === 0 && <tr>
          <td align="center" colSpan="5">No data to display</td>
        </tr>}
        {tableData.map(renderRow)}
      </tbody>
    </BootstrapTable>
    <UserForm 
      visibility={showModal} 
      onRefresh={getData} 
      onClose={toggleModal} 
      userId={currentId} />
  </div>

}

export default Table;