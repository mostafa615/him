import { Gender } from '../../../shared/gender';
export class ApplicationHelper {


  /**
   * check if national id is correct based on date
   * @param date yyyy-mm-dd
   */
  public static validateOnNationalId(nationalId: any, date: any = new Date().toISOString().substring(0, 10)) {
    try {
      var dObject = new Date(date);
      var startYear = 1900;
      var birthYear = dObject.getFullYear();
      var diff = birthYear - startYear;
      var century = Math.ceil(diff / 100) + 1;
      var shortDateFormat = dObject.toISOString().substring(0, 10).replace(/-/g, "").substring(2);
      var startOfNationalId = century + shortDateFormat;

      console.log("start of national id : ", startOfNationalId);
      return nationalId.startsWith(startOfNationalId);
    } catch (error) {
      return false;
    }
  }


  /**
   * check if gender male or female from national id
   * digit number 12
   *  even => Female
   *  odd  => male
   * @param nationalId
   * @returns
   */
  public static getGenderFromNationalId(nationalId: any) {
    if (!nationalId)
      return;

    var digit12 = parseInt(nationalId.substring(12, 13));
    console.log('digit12 : ' + digit12);

    return (((digit12 % 2) == 0) || digit12 == 0) ? Gender.FEMALE : Gender.MALE;
  }

  public static getBirthdate(nationalId: any) {
    if (!nationalId)
      return;

    var century = nationalId.substring(0, 1);
    var year = ((century - 2) * 100) + 1900;
    var birthYear = year + parseInt(nationalId.substring(1, 3));
    var birthMonth = nationalId.substring(3, 5);
    var birthDay = nationalId.substring(5, 7);

    var birthDate = birthYear + "-" + birthMonth + "-" + birthDay;


    return birthDate;
  }

}
