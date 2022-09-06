import { useEffect } from "react";
import { Link } from "react-router-dom"

const LeftNav = () => {
 
  return (
  <>
    {/* Hello world */}
    <div className="sidebar-wrapper" data-simplebar="true">
      <div className="sidebar-header">
        <div className>
          <img src="/assets/images/icon.png" className="logo-icon-2"  alt />
        </div>
        <div>
          <h6 className="logo-text"  style={{fontSize:25,color:"#9A9A9A",fontFamily: 'Raleway',fontWeight:"bold",marginRight:5,marginLeft: 5}}>
            {/* <img src="/assets/images/logo-icon.png" className="logo-icon-2" style={{width:"90%"}} alt /> */}
            Allcoaching
          </h6>
        </div>
        <a href="javascript:;" className="toggle-btn ml-auto">
          {" "}
          <i className="bx bx-menu" />
        </a>
      </div>
      {/*navigation*/}
      <ul className="metismenu" id="menu">

        <li>
          <Link to={"/dashboard"}>
            <div className="parent-icon icon-color-5">
              <i className="lni lni-layers" />
            </div>
            <div className="menu-title">Dashboard</div>
          </Link>
        </li>

        {/* <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-home-alt" />
              </div>
              <div className="menu-title">Institute</div>
            </a>
            <ul>
              <li>
                {" "}
                <Link to={"/institute/-1"}>
                  <i className="bx bx-right-arrow-alt" />
                  All
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/institute/0"}>
                  <i className="bx bx-right-arrow-alt" />
                    Unapproved
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/institute/2"}>
                  <i className="bx bx-right-arrow-alt" />
                    Blocked
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/institute/1"}>
                  <i className="bx bx-right-arrow-alt" />
                    Unblocked
                </Link>
              </li>
            </ul>
          </li> */}

        {/* <li>
          <Link to={"/instituteProfile"}>
            <div className="parent-icon icon-color-5">
              <i className="lni lni-layers" />
            </div>
            <div className="menu-title">Institute Profile</div>
          </Link>

        </li> */}

        <li>
          <Link to={"/insCourses/false"}>
            <div className="parent-icon icon-color-3">
              <i className="bx bx-book-alt" />
            </div>
            <div className="menu-title">Courses</div>
          </Link>

        </li>

        <li>
          <Link to="/feeds/images">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-news" />
            </div>
            <div className="menu-title">Community</div>
          </Link>
        </li>
      
       
        <li>
          <Link to={"/notification"}>
            <div className="parent-icon icon-color-3">
              <i className="bx bx-bell" />
            </div>
            <div className="menu-title">Send Notification</div>
          </Link>

        </li>
        <li>
          <Link to={"/insCourses/true"}>
            <div className="parent-icon icon-color-3">
              <i className="bx bx-recycle" />
            </div>
            <div className="menu-title">Recover Courses</div>
          </Link>

        </li>
         
        <li>
          <Link to="/transactions/-1">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-notepad" />
            </div>
            <div className="menu-title">Transactions</div>
          </Link>
        </li>
       
        <li>
          <Link to={"/institutePayout"}>
            <div className="parent-icon icon-color-4">
              <i className="bx bx-money" />
            </div>
            <div className="menu-title">Payout</div>
          </Link>

        </li>
        {/* <li>
            <Link to="/leaderboard/2613">
              <div className="parent-icon icon-color-7">
                <i className="bx bx-file" />
              </div>
              <div className="menu-title">Leaderboards</div>
            </Link>
          </li> */}
        {/* <li>
            <Link to="/feeds">
              <div className="parent-icon icon-color-2">
                <i className="lni lni-layers" />
              </div>
              <div className="menu-title">Feeds</div>
            </Link>
          </li> */}
        {/* <li>
          <a href="javascript:;" className="has-arrow">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-envelope" />
            </div>
            <div className="menu-title">Feeds</div>
          </a>
          <ul>
            <li>
              {" "}
              <Link to={"/feeds/images"}>
                <i className="bx bx-right-arrow-alt" />
                Images
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/feeds/texts"}>
                <i className="bx bx-right-arrow-alt" />
                Texts
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/feeds/polls"}>
                <i className="bx bx-right-arrow-alt" />
                Polls
              </Link>
            </li>
          </ul>
        </li> */}


        {/* <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Banner</div>
            </a>
              <ul>
                <li>
                  {" "}
                  <Link to={"/banner/home1"}>
                    <i className="bx bx-right-arrow-alt" />
                    Home Top
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/banner/home2"}>
                    <i className="bx bx-right-arrow-alt" />
                    Home Bottom
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/banner/test"}>
                    <i className="bx bx-right-arrow-alt" />
                    Test Series
                  </Link>
                </li>
              </ul>
          </li>
          <li>
            <Link to="/testSeriesCategory">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Test Series</div>
            </Link>
          </li>
          <li>
            <Link to="/category/notification">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Send Notifications</div>
            </Link>
          </li>
          <li>
            <Link to="/transactions/-1">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Transactions</div>
            </Link>
            <Link to="/category/analytics/list">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Category Analytics</div>
            </Link>
          </li> */}

      </ul>
      {/*        
        <ul className="metismenu" id="menu">
         <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-home-alt" />
              </div>
              <div className="menu-title">Dashboard</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="index.html">
                  <i className="bx bx-right-arrow-alt" />
                  Analytics
                </a>
              </li>
              <li>
                {" "}
                <a href="index2.html">
                  <i className="bx bx-right-arrow-alt" />
                  Sales
                </a>
              </li>
            </ul>
          </li>
          
          <li className="menu-label">Web Apps</li>
          <li>
            <Link to="/ins/134243525223">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Institute</div>
            </Link>
          </li>
          <li>
            <Link to="/analytics">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope" />
              </div>
              <div className="menu-title">Analytics</div>
            </Link>
          </li>
          <li>
            <a href="chat-box.html">
              <div className="parent-icon icon-color-3">
                {" "}
                <i className="bx bx-conversation" />
              </div>
              <div className="menu-title">Chat Box</div>
            </a>
          </li>
          <li>
            <a href="file-manager.html">
              <div className="parent-icon icon-color-4">
                <i className="bx bx-archive" />
              </div>
              <div className="menu-title">File Manager</div>
            </a>
          </li>
          <li>
            <a href="contact-list.html">
              <div className="parent-icon icon-color-5">
                <i className="bx bx-group" />
              </div>
              <div className="menu-title">Contatcs</div>
            </a>
          </li>
          <li>
            <a href="to-do.html">
              <div className="parent-icon icon-color-6">
                <i className="bx bx-task" />
              </div>
              <div className="menu-title">Todo List</div>
            </a>
          </li>
          <li>
            <a href="invoice.html">
              <div className="parent-icon icon-color-7">
                <i className="bx bx-file" />
              </div>
              <div className="menu-title">Invoice</div>
            </a>
          </li>
          <li>
            <a href="fullcalender.html">
              <div className="parent-icon icon-color-8">
                {" "}
                <i className="bx bx-calendar-check" />
              </div>
              <div className="menu-title">Calendar</div>
            </a>
          </li>
          <li className="menu-label">UI Elements</li>
          <li>
            <a href="widgets.html">
              <div className="parent-icon icon-color-9">
                <i className="bx bx-ghost" />
              </div>
              <div className="menu-title">Widgets</div>
            </a>
          </li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-10">
                <i className="bx bx-spa" />
              </div>
              <div className="menu-title">Components</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="component-alerts.html">
                  <i className="bx bx-right-arrow-alt" />
                  Alerts
                </a>
              </li>
              <li>
                {" "}
                <a href="component-bedges.html">
                  <i className="bx bx-right-arrow-alt" />
                  Badge
                </a>
              </li>
              <li>
                {" "}
                <a href="component-buttons.html">
                  <i className="bx bx-right-arrow-alt" />
                  Buttons
                </a>
              </li>
              <li>
                {" "}
                <a href="component-cards.html">
                  <i className="bx bx-right-arrow-alt" />
                  Cards
                </a>
              </li>
              <li>
                {" "}
                <a href="component-carousels.html">
                  <i className="bx bx-right-arrow-alt" />
                  Carousel
                </a>
              </li>
              <li>
                {" "}
                <a href="component-acordians.html">
                  <i className="bx bx-right-arrow-alt" />
                  Acordians
                </a>
              </li>
              <li>
                {" "}
                <a href="component-list-groups.html">
                  <i className="bx bx-right-arrow-alt" />
                  List Groups
                </a>
              </li>
              <li>
                {" "}
                <a href="component-media-object.html">
                  <i className="bx bx-right-arrow-alt" />
                  Media Objects
                </a>
              </li>
              <li>
                {" "}
                <a href="component-modals.html">
                  <i className="bx bx-right-arrow-alt" />
                  Modal
                </a>
              </li>
              <li>
                {" "}
                <a href="component-navs.html">
                  <i className="bx bx-right-arrow-alt" />
                  Navs
                </a>
              </li>
              <li>
                {" "}
                <a href="components-navbar.html">
                  <i className="bx bx-right-arrow-alt" />
                  Navbar
                </a>
              </li>
              <li>
                {" "}
                <a href="component-paginations.html">
                  <i className="bx bx-right-arrow-alt" />
                  Pagination
                </a>
              </li>
              <li>
                {" "}
                <a href="component-popovers-tooltips.html">
                  <i className="bx bx-right-arrow-alt" />
                  Popovers &amp; Tooltips
                </a>
              </li>
              <li>
                {" "}
                <a href="component-progress-bars.html">
                  <i className="bx bx-right-arrow-alt" />
                  Progress
                </a>
              </li>
              <li>
                {" "}
                <a href="component-spinners.html">
                  <i className="bx bx-right-arrow-alt" />
                  Spinners
                </a>
              </li>
              <li>
                {" "}
                <a href="component-notifications.html">
                  <i className="bx bx-right-arrow-alt" />
                  Notifications
                </a>
              </li>
              <li>
                {" "}
                <a href="components-avtars-chips.html">
                  <i className="bx bx-right-arrow-alt" />
                  Avatrs &amp; Chips
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-11">
                <i className="bx bx-repeat" />
              </div>
              <div className="menu-title">Content</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="content-grid-system.html">
                  <i className="bx bx-right-arrow-alt" />
                  Grid System
                </a>
              </li>
              <li>
                {" "}
                <a href="content-typography.html">
                  <i className="bx bx-right-arrow-alt" />
                  Typography
                </a>
              </li>
              <li>
                {" "}
                <a href="content-text-utilities.html">
                  <i className="bx bx-right-arrow-alt" />
                  Text Utilities
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-12">
                {" "}
                <i className="bx bx-donate-blood" />
              </div>
              <div className="menu-title">Icons</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="icons-line-icons.html">
                  <i className="bx bx-right-arrow-alt" />
                  Line Icons
                </a>
              </li>
              <li>
                {" "}
                <a href="icons-boxicons.html">
                  <i className="bx bx-right-arrow-alt" />
                  Boxicons
                </a>
              </li>
              <li>
                {" "}
                <a href="icons-feather-icons.html">
                  <i className="bx bx-right-arrow-alt" />
                  Feather Icons
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-label">Forms &amp; Tables</li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-1">
                {" "}
                <i className="bx bx-comment-edit" />
              </div>
              <div className="menu-title">Forms</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="form-elements.html">
                  <i className="bx bx-right-arrow-alt" />
                  Form Elements
                </a>
              </li>
              <li>
                {" "}
                <a href="form-input-group.html">
                  <i className="bx bx-right-arrow-alt" />
                  Input Groups
                </a>
              </li>
              <li>
                {" "}
                <a href="form-layouts.html">
                  <i className="bx bx-right-arrow-alt" />
                  Forms Layouts
                </a>
              </li>
              <li>
                {" "}
                <a href="form-validations.html">
                  <i className="bx bx-right-arrow-alt" />
                  Form Validation
                </a>
              </li>
              <li>
                {" "}
                <a href="form-wizard.html">
                  <i className="bx bx-right-arrow-alt" />
                  Form Wizard
                </a>
              </li>
              <li>
                {" "}
                <a href="form-text-editor.html">
                  <i className="bx bx-right-arrow-alt" />
                  Text Editor
                </a>
              </li>
              <li>
                {" "}
                <a href="form-file-upload.html">
                  <i className="bx bx-right-arrow-alt" />
                  File Upload
                </a>
              </li>
              <li>
                {" "}
                <a href="form-date-time-pickes.html">
                  <i className="bx bx-right-arrow-alt" />
                  Date Pickers
                </a>
              </li>
              <li>
                {" "}
                <a href="form-select2.html">
                  <i className="bx bx-right-arrow-alt" />
                  Select2
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-grid-alt" />
              </div>
              <div className="menu-title">Tables</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="table-basic-table.html">
                  <i className="bx bx-right-arrow-alt" />
                  Basic Table
                </a>
              </li>
              <li>
                {" "}
                <a href="table-datatable.html">
                  <i className="bx bx-right-arrow-alt" />
                  Data Table
                </a>
              </li>
              <li>
                {" "}
                <a href="table-editable.html">
                  <i className="bx bx-right-arrow-alt" />
                  Editable Table
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-label">Pages</li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-lock" />
              </div>
              <div className="menu-title">Authentication</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="authentication-login.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  Login
                </a>
              </li>
              <li>
                {" "}
                <a href="authentication-register.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  Register
                </a>
              </li>
              <li>
                {" "}
                <a href="authentication-forgot-password.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  Forgot Password
                </a>
              </li>
              <li>
                {" "}
                <a href="authentication-reset-password.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  Reset Password
                </a>
              </li>
              <li>
                {" "}
                <a href="authentication-lock-screen.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  Lock Screen
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="user-profile.html">
              <div className="parent-icon icon-color-4">
                <i className="bx bx-user-circle" />
              </div>
              <div className="menu-title">User Profile</div>
            </a>
          </li>
          <li>
            <a href="timeline.html">
              <div className="parent-icon icon-color-5">
                {" "}
                <i className="bx bx-video-recording" />
              </div>
              <div className="menu-title">Timeline</div>
            </a>
          </li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-6">
                <i className="bx bx-error" />
              </div>
              <div className="menu-title">Errors</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="errors-404-error.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  404 Error
                </a>
              </li>
              <li>
                {" "}
                <a href="errors-500-error.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  500 Error
                </a>
              </li>
              <li>
                {" "}
                <a href="errors-coming-soon.html" target="_blank">
                  <i className="bx bx-right-arrow-alt" />
                  Coming Soon
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="faq.html">
              <div className="parent-icon icon-color-7">
                <i className="bx bx-help-circle" />
              </div>
              <div className="menu-title">FAQ</div>
            </a>
          </li>
          <li>
            <a href="pricing-table.html">
              <div className="parent-icon icon-color-8">
                <i className="bx bx-diamond" />
              </div>
              <div className="menu-title">Pricing</div>
            </a>
          </li>
          <li className="menu-label">Charts &amp; Maps</li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-9">
                <i className="bx bx-line-chart" />
              </div>
              <div className="menu-title">Charts</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="charts-apex-chart.html">
                  <i className="bx bx-right-arrow-alt" />
                  Apex
                </a>
              </li>
              <li>
                {" "}
                <a href="charts-chartjs.html">
                  <i className="bx bx-right-arrow-alt" />
                  Chartjs
                </a>
              </li>
              <li>
                {" "}
                <a href="charts-highcharts.html">
                  <i className="bx bx-right-arrow-alt" />
                  Highcharts
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-10">
                <i className="bx bx-map-alt" />
              </div>
              <div className="menu-title">Maps</div>
            </a>
            <ul>
              <li>
                {" "}
                <a href="map-google-maps.html">
                  <i className="bx bx-right-arrow-alt" />
                  Google Maps
                </a>
              </li>
              <li>
                {" "}
                <a href="map-vector-maps.html">
                  <i className="bx bx-right-arrow-alt" />
                  Vector Maps
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-label">Others</li>
          <li>
            <a className="has-arrow" href="javascript:;">
              <div className="parent-icon icon-color-11">
                <i className="bx bx-menu" />
              </div>
              <div className="menu-title">Menu Levels</div>
            </a>
            <ul>
              <li>
                {" "}
                <a className="has-arrow" href="javascript:;">
                  <i className="bx bx-right-arrow-alt" />
                  Level One
                </a>
                <ul>
                  <li>
                    {" "}
                    <a className="has-arrow" href="javascript:;">
                      <i className="bx bx-right-arrow-alt" />
                      Level Two
                    </a>
                    <ul>
                      <li>
                        {" "}
                        <a href="javascript:;">
                          <i className="bx bx-right-arrow-alt" />
                          Level Three
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://codervent.com/syndash/documentation/index.html"
              target="_blank"
            >
              <div className="parent-icon icon-color-12">
                <i className="bx bx-folder" />
              </div>
              <div className="menu-title">Documentation</div>
            </a>
          </li>
          <li>
            <a href="https://themeforest.net/user/codervent" target="_blank">
              <div className="parent-icon">
                <i className="bx bx-support" />
              </div>
              <div className="menu-title">Support</div>
            </a>
          </li>
          </ul>
         */}

      {/*end navigation*/}
    </div>
  </>
)}

export default LeftNav
