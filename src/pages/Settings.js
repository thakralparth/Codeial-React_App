import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const Settings = () =>{
    const auth = useAuth();
    const [editMode,setEditMode] = useState(false);
    const [name,setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPasssword]=useState('');
    const [savingForm , setSavingForm] = useState(false);
    const { addToast } = useToasts();

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                {editMode ? (
                    <input 
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                ) : (
                    <div className={styles.fieldValue}>{auth.user?.name}</div>

                )}
            </div>
            {editMode && (
                <>
                        <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPasssword(e.target.value)}
                        />
                    </div>
                </>
            )}
            

            <div className={styles.btnGrp}>
                    {editMode ? (
                <>
                    <button
                    className={`button ${styles.saveBtn}`}
                    // onClick={}
                    disabled={savingForm}
                    >
                    {savingForm ? 'Saving profile...' : 'Save profile'}
                    </button>
                    <button
                    className={`button ${styles.editBtn}`}
                    onClick={() => setEditMode(false)}
                    >
                    Go back
                    </button>
                </>
                ) : (
                <button
                    className={`button ${styles.editBtn}`}
                    onClick={() => setEditMode(true)}
                >
                    Edit Profile
                </button>
                )}
            </div>
        </div>
    )
}


export default Settings;