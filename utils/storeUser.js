import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(key, data) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // There was an error on the native side
  }
}

export async function retrieveUserSession(key) {
  try {
    const session = await EncryptedStorage.getItem(key);

    if (session !== undefined) {
      return JSON.parse(session);
    } else {
      return 'Data not found';
    }
  } catch (error) {
    return 'Something went wrong';
    // There was an error on the native side
  }
}

export async function removeUserSession(key) {
  try {
    await EncryptedStorage.removeItem(key);
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
  }
}
