import React from "react";
import { Link, NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";

interface Props {}

const AdminHome: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="container">
        <div className="admin-dashboard">
          <h1>Admin Ddashboard</h1>
          <div className="rowNew rowNew--high">
            <div className="col2 col--right-high">
              <div className="admin-daashboard__layout">
                <div className="btn">
                  <Link className="link" to="/admin/categories/create">
                    Create Category
                  </Link>
                </div>
              </div>
            </div>
            <div className="col2 col--left-high">
              {/* <div className="admin-daashboard__layout">
                <div className="btn">Create Category</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
