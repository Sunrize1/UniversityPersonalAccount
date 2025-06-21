import { useState, useEffect } from 'react';
import styles from './ProfileInfo.module.css';
import ArrowUpIcon from '../../../assets/icons/Arrow/black/Caret_Up_MD.svg?react';
import ArrowDownIcon from '../../../assets/icons/Arrow/black/Caret_Down_MD.svg?react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserType } from '../../../types/api/profileResponse';
import { EmployeeProfile, StudentProfile } from '../../../types/api/studentEmployeeDataResponse';
import { getStudent } from '../../../api/requests/getStudent';
import { getEmployee } from '../../../api/requests/getEmployee';
import { showNotification } from '../../../utils/notification';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { FormattedMessage } from 'react-intl';

export const ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'education' | 'work' | null>(null);
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeProfile | null>(null);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const user = useAppSelector((state) => state.user.user);
  const userTypes = user?.userTypes || [];

  const hasStudentRole = userTypes.includes(UserType.Student);
  const hasEmployeeRole = userTypes.includes(UserType.Employee);

  useEffect(() => {
    if (hasStudentRole) {
      setActiveTab('education');
    } else if (hasEmployeeRole) {
      setActiveTab('work');
    }
  }, [hasStudentRole, hasEmployeeRole]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hasStudentRole) {
          const response = await getStudent();
          const data = response.data;
          setStudentData(data);
        }
        if (hasEmployeeRole) {
          const response = await getEmployee();
          const data = response.data;
          setEmployeeData(data);
        }
      } catch (error) {
        showNotification(dispatch, 'Ошибка загрузки данных', NotificationTypeEnum.ERROR, 5000);
      }
    };
    fetchData();
  }, [hasStudentRole, hasEmployeeRole, dispatch]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderEducation = () => {
    if (!studentData) return <p><FormattedMessage id="loading" defaultMessage="Данные загружаются..." /></p>;
    return (
      <div className={styles.educationContainer}>
        {studentData.educationEntries.map((entry) => (
          <div key={entry.id} className={styles.educationBlock}>
            <div className={styles.header}>
              <div className={styles.educationLevel}>
                <h4>{entry.educationLevel.name}</h4>
              </div>
              <div className={styles.educationStatus}>
                <h4>{entry.educationStatus.name}</h4>
                <button onClick={() => toggleExpand(entry.id)} className={styles.toggleButton}>
                  {expanded[entry.id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
              </div>
            </div>

            <div className={`${styles.details} ${expanded[entry.id] ? styles.expanded : ''}`}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="educationYears" /></p>
                  <p className={styles.value}>{entry.educationYears.name}</p>
                </div>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="creditBookNumber" /></p>
                  <p className={styles.value}>{entry.creditBooknumber}</p>
                </div>
              </div>
              <hr className={styles.line} />

              <div className={styles.row}>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="educationForm" /></p>
                  <p className={styles.value}>{entry.educationForm.name}</p>
                </div>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="educationBase" /></p>
                  <p className={styles.value}>{entry.educationBase.name}</p>
                </div>
              </div>
              <hr className={styles.line} />

              <div className={styles.column}>
                <p className={'p2' + ' ' + styles.label}><FormattedMessage id="faculty" /></p>
                <p className={styles.value}>{entry.faculty.name}</p>
              </div>
              <hr className={styles.line} />

              <div className={styles.column}>
                <p className={'p2' + ' ' + styles.label}><FormattedMessage id="educationDirection" /></p>
                <p className={styles.value}>{entry.educationDirection.name}</p>
              </div>
              <hr className={styles.line} />

              <div className={styles.column}>
                <p className={'p2' + ' ' + styles.label}><FormattedMessage id="educationProfile" /></p>
                <p className={styles.value}>{entry.educationProfile.name}</p>
              </div>
              <hr className={styles.line} />

              <div className={styles.row}>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="course" /></p>
                  <p className={styles.value}>{entry.course}</p>
                </div>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="group" /></p>
                  <p className={styles.value}>{entry.group.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWork = () => {
    if (!employeeData) return <p><FormattedMessage id="loading" defaultMessage="Данные загружаются..." /></p>;

    const employeeExperienceGroup = [];
    for (let i = 0; i < employeeData.experience.length; i += 2) {
      const pair = employeeData.experience.slice(i, i + 2);
      employeeExperienceGroup.push(pair);
    }

    return (
      <div className={styles.educationContainer}>
        <div key="experience" className={styles.educationBlock}>
          <div className={styles.header}>
            <div className={styles.educationLevel}>
              <h4><FormattedMessage id="exp" /></h4>
            </div>
            <button onClick={() => toggleExpand('experience')} className={styles.toggleButton}>
              {expanded['experience'] ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
          </div>

          <div className={`${styles.details} ${expanded['experience'] ? styles.expanded : ''}`}>
            {employeeExperienceGroup.map((expGroup, index) => (
              <div key={index} className={styles.row}>
                {expGroup.map((exp, expIndex) => (
                  <div key={expIndex} className={styles.column}>
                    <p className={'p2' + ' ' + styles.label}>
                      <FormattedMessage id={exp.type} />
                    </p>
                    <p className={styles.value}>
                      <FormattedMessage id="experienceDuration" values={{ years: exp.years, months: exp.months }} />
                    </p>
                  </div>
                ))}
                {index < employeeExperienceGroup.length - 1 && <hr className={styles.line} />}
              </div>
            ))}
          </div>
        </div>

        {employeeData.posts.map((post) => (
          <div key={post.id} className={styles.educationBlock}>
            <div className={styles.header}>
              <div className={styles.educationLevel}>
                <h4>{post.postName.name}</h4>
              </div>
              <button onClick={() => toggleExpand(`post-${post.id}`)} className={styles.toggleButton}>
                {expanded[`post-${post.id}`] ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </button>
            </div>

            <div className={`${styles.details} ${expanded[`post-${post.id}`] ? styles.expanded : ''}`}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="employment" /></p>
                  <p className={styles.value}>{post.employmentType}</p>
                </div>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="rate" /></p>
                  <p className={styles.value}>{post.rate}</p>
                </div>
              </div>
              <hr className={styles.line} />

              <div className={styles.column}>
                <p className={'p2' + ' ' + styles.label}><FormattedMessage id="workPlace" /></p>
                <p className={styles.value}>{post.departments.map((d) => d.name).join(', ')}</p>
              </div>
              <hr className={styles.line} />

              <div className={styles.column}>
                <p className={'p2' + ' ' + styles.label}><FormattedMessage id="employmentType" /></p>
                <p className={styles.value}>{post.postType.name}</p>
              </div>
              <hr className={styles.line} />

              <div className={styles.row}>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="startDate" /></p>
                  <p className={styles.value}>{post.dateStart}</p>
                </div>
                <div className={styles.column}>
                  <p className={'p2' + ' ' + styles.label}><FormattedMessage id="endDate" /></p>
                  <p className={styles.value}>{post.dateEnd || <FormattedMessage id="present" defaultMessage="по настоящее время" />}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.tabs}>
        {hasStudentRole && (
          <button
            className={`${styles.tab} ${activeTab === 'education' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <h3><FormattedMessage id="education" /></h3>
          </button>
        )}
        {hasEmployeeRole && (
          <button
            className={`${styles.tab} ${activeTab === 'work' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('work')}
          >
            <h3><FormattedMessage id="work" /></h3>
          </button>
        )}
      </div>
      <div className={styles.content}>
        {activeTab === 'education' && renderEducation()}
        {activeTab === 'work' && renderWork()}
      </div>
    </div>
  );
};