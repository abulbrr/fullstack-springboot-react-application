import {useEffect, useState} from "react";
import {deleteStudent, getAllStudents} from "./client";
import {Avatar, Badge, Button, Empty, Layout, Menu, Popconfirm, Spin, Table, Tag} from "antd";

import {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    PieChartOutlined, PlusOutlined, UserOutlined,
} from '@ant-design/icons';

import './App.css';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";

const {Header, Content, Footer, Sider} = Layout;

const loadingIcon = <LoadingOutlined style={{fontSize: 24}}/>

const AvatarIcon = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}></Avatar>
    }

    let splitName = trim.split(' ');
    return <Avatar>{splitName.map(namePart => namePart.charAt(0).toUpperCase())}</Avatar>
}

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    function removeStudent(student) {
        deleteStudent(student)
            .then(() => {
                successNotification("Deleted successfully");
                fetchStudents();
            })
            .catch((err) => {
                err.response.json().then(error => {
                    errorNotification("There was an error", `${error.message} [${error.status}] [${error.error}]`);
                })
            })
    }

    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) => <AvatarIcon name={student.name}/>

        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, student) => {
                return <> <Popconfirm
                    title="Are you sure to delete this student?"
                    onConfirm={() => removeStudent(student)}
                    okText="Yes"
                    cancelText="No"
                ><Button icon={<DeleteOutlined/>}/></Popconfirm>
                    <Button icon={<EditOutlined/>}/>
                </>
            }
        },
    ];

    useEffect(() => {
        console.log("Component is mounted")
        fetchStudents()
    }, [])

    const fetchStudents = () => {
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                setFetching(false)
            })
    }

    const renderStudentsTable = () => {
        if (fetching) {
            return <Spin indicator={loadingIcon}></Spin>
        }
        if (students.length === 0) {
            return <Empty/>
        }
        return <>
            <StudentDrawerForm
                setShowDrawer={setShowDrawer}
                showDrawer={showDrawer}
                fetchStudents={fetchStudents}
            />

            <Table dataSource={students}
                   columns={columns}
                   rowKey="id"
                   bordered
                   title={() => renderCreateStudentButton()}
                   pagination={{pageSize: 50}}
                   scroll={{y: 800}}
            />
        </>
    }

    const renderCreateStudentButton = () => {
        return <>
            <Button type="primary" shape="round" icon={<PlusOutlined/>} size="medium"
                    onClick={() => setShowDrawer(!showDrawer)}>
                Add New Student
            </Button>
            <Tag style={{marginLeft: "10px"}}>Number of students</Tag>
            <Badge count={students.length} className="site-badge-count-4"/>
        </>
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Pie Chart Outlined
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudentsTable()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Habbal © 2022</Footer>
        </Layout>
    </Layout>
}

export default App;
