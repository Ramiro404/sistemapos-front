public class DatabaseConnection
{
    private static DatabaseConnection _instance;

    private DatabaseConnection() {}
    
    public static DatabaseConnection GetInstance()
    {
        if (_instance == null)
        {
            _instance = new DatabaseConnection();
        }
        return _instance;
    }
}

var connection = DatabaseConnection.GetInstance();